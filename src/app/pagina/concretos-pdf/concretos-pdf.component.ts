import { Component, ViewChild , ElementRef,  EventEmitter, Output } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';
import { FechasReporteDto } from 'src/app/modelo/fechas-reporte-dto';
import { ReporteGetDto } from 'src/app/modelo/reporte-get-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-concretos-pdf',
  templateUrl: './concretos-pdf.component.html',
  styleUrls: ['./concretos-pdf.component.css']
})
export class ConcretosPdfComponent {

  dataSource = new MatTableDataSource<ReporteGetDto>([]);
  ordenDto: OrdenDto = new OrdenDto(); // Instancia de OrdenDto
  fechasReporteDto: FechasReporteDto = new FechasReporteDto();
  fecha: string[]=[];
  displayedColumns: string[] = ['muestra'];

  constructor(private adminService: AdministradorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const url: string = params['fechas']; // Suponiendo que el parámetro en la URL se llama 'id'
       const urlParts: string[] = url.split('_'); // Dividimos la URL por el guion bajo '_' 
      if (urlParts.length === 3) {
        this.fecha = urlParts.slice(0, 3); // Tomamos los primeros tres elementos
        console.log(this.fecha);

      } else {
        console.error('La URL no tiene el formato esperado.');
      }
    });

    this.listarReporte();
  }

  listarReporte(): void {

    this.fechasReporteDto.cr=this.fecha[0];
    this.fechasReporteDto.fechaInicio=this.fecha[1];
    this.fechasReporteDto.fechaFin=this.fecha[2];

    this.adminService.listarReporte(this.fechasReporteDto)
      .subscribe(
        (response: any) => {
          this.dataSource = response.respuesta; // Asigna la respuesta al dataSource
          console.log(this.dataSource); // Verifica en consola que los datos se han recibido correctamente
        },
        error => {
          console.error('Error al obtener la lista de cilindros:', error);
        }
      );
  }

}

function ngAfterViewInit() {
    throw new Error('Function not implemented.');
  }
