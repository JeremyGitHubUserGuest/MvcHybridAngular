import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Document {
  fileName: string;
  docType: string;
  created: Date;
}

@Injectable({
  providedIn: 'root' // Fournit le service à l'échelle de l'application
})
export class DocumentService {
  private documents: Document[] = [
    { fileName: 'Document1.pdf', docType: 'PDF', created: new Date('2023-01-01') },
    { fileName: 'Document2.docx', docType: 'Word', created: new Date('2023-01-02') },
    { fileName: 'Document3.xlsx', docType: 'Excel', created: new Date('2023-01-03') },
    { fileName: 'Document4.txt', docType: 'Text', created: new Date('2023-01-04') },
    { fileName: 'Document5.jpg', docType: 'Image', created: new Date('2023-01-05') },
    { fileName: 'Document6.pdf', docType: 'PDF', created: new Date('2023-01-06') },
    { fileName: 'Document7.docx', docType: 'Word', created: new Date('2023-01-07') },
    { fileName: 'Document8.xlsx', docType: 'Excel', created: new Date('2023-01-08') },
    { fileName: 'Document9.txt', docType: 'Text', created: new Date('2023-01-09') },
    { fileName: 'Document10.jpg', docType: 'Image', created: new Date('2023-01-10') },
    { fileName: 'Document11.pdf', docType: 'PDF', created: new Date('2023-01-11') },
    { fileName: 'Document12.docx', docType: 'Word', created: new Date('2023-01-12') },
    { fileName: 'Document13.xlsx', docType: 'Excel', created: new Date('2023-01-13') },
    { fileName: 'Document14.txt', docType: 'Text', created: new Date('2023-01-14') },
    { fileName: 'Document15.jpg', docType: 'Image', created: new Date('2023-01-15') },
    { fileName: 'Document16.pdf', docType: 'PDF', created: new Date('2023-01-16') },
    { fileName: 'Document17.docx', docType: 'Word', created: new Date('2023-01-17') },
    { fileName: 'Document18.xlsx', docType: 'Excel', created: new Date('2023-01-18') },
    { fileName: 'Document19.txt', docType: 'Text', created: new Date('2023-01-19') },
    { fileName: 'Document20.jpg', docType: 'Image', created: new Date('2023-01-20') },
    // Ajout de 180 autres documents pour atteindre 200
    ...Array.from({ length: 180 }, (_, i) => ({
      fileName: `Document${i + 21}.pdf`,
      docType: ['PDF', 'Word', 'Excel', 'Text', 'Image'][i % 5],
      created: new Date(2023, 0, (i % 31) + 1), // Dates cycliques sur janvier
    })),
  ];

  constructor() { }

  getDocuments(): Observable<Document[]> {
    // Retourne un observable contenant les documents
    return of(this.documents);
  }
}
