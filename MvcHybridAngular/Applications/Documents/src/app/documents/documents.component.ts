import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadComponent } from '../uploader/upload.component';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { DocumentService, Document } from '../services/document.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  displayedColumns: string[] = ['fileName', 'docType', 'created', 'actions'];
  private documentSubject = new BehaviorSubject<Document[]>([]); // BehaviorSubject pour stocker les données
  dataSource = new MatTableDataSource<Document>([]); // MatTableDataSource initialisé avec un tableau vide

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private documentService: DocumentService) { }

  ngAfterViewInit() {
    // Souscrit au service pour récupérer les documents une seule fois
    this.documentService.getDocuments()
      .pipe(take(1)) // Prend une seule émission et ferme la souscription
      .subscribe((documents) => {
        this.documentSubject.next(documents); // Pousse les données dans le BehaviorSubject
      });

    // Souscrit au BehaviorSubject pour mettre à jour la MatTableDataSource
    this.documentSubject.subscribe((documents) => {
      this.dataSource.data = documents; // Met à jour la MatTableDataSource uniquement ici
      this.dataSource.paginator = this.paginator; // Configure la pagination
      this.dataSource.sort = this.sort; // Configure le tri
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadDocument(fileName: string) {
    console.log(`Downloading ${fileName}`);
    // Implémentez ici la logique de téléchargement
  }

  openUploadDialog() {
    this.dialog.open(UploadComponent, {
      width: '400px',
      data: {} // Vous pouvez passer des données ici si nécessaire
    });
  }
}

