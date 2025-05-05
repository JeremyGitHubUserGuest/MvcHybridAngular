import { Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { UploadComponent } from './uploader/upload.component';

export const routes: Routes = [
  { path: '', component: DocumentsComponent }, // Page d'accueil
  { path: 'upload', component: UploadComponent } // Page "About"
];
