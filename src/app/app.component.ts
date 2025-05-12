import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentChange, QuillEditorComponent, QuillModule } from 'ngx-quill';
import { ListBlot } from './quill/formats/list';
import { ListItemBlot } from './quill/formats/list-item';
import Quill from 'quill/core';
@Component({
  selector: 'app-root',
  imports: [QuillModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'quill-app';
  delta: string = '';
  parchment: string = '';
  @ViewChild('editor') editor!: QuillEditorComponent;

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
