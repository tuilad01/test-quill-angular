import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentChange, QuillEditorComponent, QuillModule } from 'ngx-quill';
import { ListBlot } from './quill/formats/list';
import { ListItemBlot } from './quill/formats/list-item';
import Quill, { Delta, Op } from 'quill';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [QuillModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  handleEditorCreated($event: Quill) {
    this.quill = $event;
  }
  insertFormula() {
    if (!this.quill) {
      return;
    }

    const savedDelta = this.quill.insertEmbed(
      this.quill.getSelection()?.index || 0,
      'custom-formula',
      { formula: 'MAX(1,2)', result: '3' },
      'api'
    );

    console.log('savedDelta', savedDelta);
  }

  insertFormulaDelta() {
    const ops = JSON.parse(
      '{ "ops": [ { "insert": { "custom-formula": { "formula": "MAX(1,2)", "result": "3" } } }, { "insert": "\\n" } ] }'
    ) as Op[];
    const delta = new Delta(ops);
    this.quill?.insertText(
      this.quill.getSelection()?.index || 0,

      '\n',
      Quill.sources.USER
    );
    this.quill?.editor.insertContents(
      (this.quill.getSelection()?.index || 0) + 1,
      delta
    );
  }

  logDelta() {
    console.log(JSON.stringify(this.quill?.getContents()));
  }

  title = 'quill-app';
  delta: string = '';
  parchment: string = '';
  @ViewChild('editor') editor!: QuillEditorComponent;
  quill?: Quill;

  handleContentChanged(contentChange: ContentChange) {
    this.delta = JSON.stringify(contentChange.content);

    this.parchment = contentChange.html || '';
  }
  insertList() {
    const { quillEditor } = this.editor;
    const range = quillEditor.getSelection(true);

    quillEditor.insertText(range.index, '\n', Quill.sources.USER);
    quillEditor.insertEmbed(
      range.index + 1,
      'list',
      'first item',
      Quill.sources.USER
    );
    quillEditor.setSelection(range.index + 2, Quill.sources.SILENT);
  }
}
