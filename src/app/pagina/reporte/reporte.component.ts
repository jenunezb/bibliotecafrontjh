import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { FechasReporteDto } from 'src/app/modelo/fechas-reporte-dto';
import { ReporteGetDto } from 'src/app/modelo/reporte-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{

  dataSource = new MatTableDataSource<ReporteGetDto>([]);
  displayedColumns: string[] = ['muestra', "descripcion", "fechadeToma", "fechaFalla","edad","peso", "densidad","carga","obra", "esfuerzoKg", "esfuerzoPsi", "esfuerzoMpa", "resistencia", "desarrollo", "obs"];
  alerta: Alerta | null = null;
  fechasReporteDto: FechasReporteDto = new FechasReporteDto();
  fecha: string = "";

  constructor(private authService: AuthService, private administradorService: AdministradorService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fecha = params['fechasReporteDto'];
      this.listarReporte();
      console.log(this.fecha);
    });
  }

  public listarReporte(): void{
    this.authService.listarReporte(this.fechasReporteDto)
    .subscribe(
      (response: any) => {
        this.dataSource.data = response.respuesta; 
        if(this.dataSource.data.length==0){
        }
      },
      error => {
        this.alerta = { mensaje: error.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
      }
    );
  }

  openWindowResultados(fechasReporteDto: string): void {
    fechasReporteDto= this.fechasReporteDto.cr +"_"+this.fechasReporteDto.fechaInicio +"_"+ this.fechasReporteDto.fechaFin;
    window.open(`/concretos-pdf/${fechasReporteDto}`, 'Crear Cilindro', 'width=1000, height=500');
  }
}
