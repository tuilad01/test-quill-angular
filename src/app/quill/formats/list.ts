import Quill from 'quill';
import { ContainerBlot } from 'parchment';

export class ListBlot extends ContainerBlot {
  blotName = 'list';
  tagName = 'ul';
}

Quill.register(ListBlot);
