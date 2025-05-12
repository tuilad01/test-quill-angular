import Quill from 'quill';
import { BlockBlot } from 'parchment';

export class ListItemBlot extends BlockBlot {
  blotName = 'listitem';
  tagName = 'li';
}

Quill.register(ListItemBlot);
