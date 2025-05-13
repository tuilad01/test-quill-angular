import Embed from 'quill/blots/embed';

export class CustomFormulaBlot extends Embed {
  static override blotName = 'custom-formula';
  static override tagName = 'app-formula';

  static override create(value: { formula: string; result: string }) {
    const node = super.create() as HTMLElement;
    node.setAttribute('data-formula', value.formula);
    node.setAttribute('data-result', value.result);

    node.textContent = value.result;
    return node;
  }

  static override value(domNode: Element) {
    return {
      formula: domNode.getAttribute('data-formula') || '',
      result: domNode.getAttribute('data-result') || '',
    };
  }

  //   override format(name: string, value: any): void {
  //     if (name === 'custom-formula' && typeof value === 'object') {
  //       if (value.formula)
  //         this.domNode.setAttribute('data-formula', value.formula);
  //       if (value.result) {
  //         this.domNode.setAttribute('data-result', value.result);
  //         this.domNode.textContent = value.result;
  //       }
  //     } else {
  //       super.format(name, value);
  //     }
  //   }
}
