import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  contentTypes: string[] = [
    "document d'identité",
    "fiche de paie",
    "facture"
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      contentType: [this.contentTypes[0], Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ file: this.selectedFile });
    }
  }

  uploadFile() {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('contentType', this.form.value.contentType);
      console.log('Envoi du fichier...', formData.get('file'), formData.get('contentType'));
      // TODO: Envoyer le formData à une API
    } else {
      console.warn('Formulaire invalide ou aucun fichier sélectionné');
    }
  }
}
