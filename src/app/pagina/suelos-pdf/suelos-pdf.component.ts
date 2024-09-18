import { Component, EventEmitter, Output } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-suelos-pdf',
  templateUrl: './suelos-pdf.component.html',
  styleUrls: ['./suelos-pdf.component.css']
})
export class SuelosPdfComponent {

  @Output() generarReportePDF = new EventEmitter<void>();
  pdfTemplate: any;

  generatePDF() {
    const templateElement = document.getElementById('pdf-template');
  
    if (templateElement) {
      html2canvas(templateElement, { scale: 2 }) 
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const doc = new jsPDF();
          doc.addImage(imgData, 'PNG', 10, 10, 180, 0); 
          doc.save('Informe_SueloEnsayo.pdf');
        })
        .catch(error => {
          console.error('Error al convertir HTML a lienzo:', error);
        });
    } else {
      console.error('Elemento de plantilla PDF no encontrado');
    }
  }
    ngAfterViewInit() {
      this.generarReportePDF.subscribe(() => {
        if (this.pdfTemplate) {
          this.generatePDF();
        } else {
          console.error('Elemento de plantilla PDF no encontrado');
        }
      });
  }
}

function ngAfterViewInit() {
    throw new Error('Function not implemented.');
  }