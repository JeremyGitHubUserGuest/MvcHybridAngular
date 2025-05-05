import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadComponent } from '../uploader/upload.component';

export interface Document {
  fileName: string;
  docType: string;
  created: Date;
}

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
  dataSource: MatTableDataSource<Document>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documents: Document[] = [
    { fileName: 'Document1.pdf', docType: 'PDF', created: new Date('2023-01-01') },
    { fileName: 'Document2.docx', docType: 'Word', created: new Date('2023-02-15') },
    { fileName: 'Document3.xlsx', docType: 'Excel', created: new Date('2023-03-10') },
    // Ajoutez d'autres documents ici
  ];

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.documents);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
