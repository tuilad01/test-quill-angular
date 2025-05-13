import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Quill from 'quill';
import { CustomFormulaBlot } from './app/quill/formats/formula';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

Quill.register(CustomFormulaBlot);
