import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
export class ReporteComponent {

  dataSource = new MatTableDataSource<ReporteGetDto>([]);
  displayedColumns: string[] = ['muestra', "descripcion", "fechadeToma", "fechaFalla","edad","peso", "densidad","carga","obra", "esfuerzoKg", "esfuerzoPsi", "esfuerzoMpa", "resistencia", "desarrollo", "obs"];
  alerta: Alerta | null = null;
  fechasReporteDto: FechasReporteDto = new FechasReporteDto();

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { }

  public listarReporte(): void{
    this.administradorService.listarReporte(this.fechasReporteDto)
    .subscribe(
      (response: any) => {
        this.dataSource.data = response.respuesta; 
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Error al obtener la orden:', error);
      }
    );
  }
}
