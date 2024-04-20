import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['Cr','numeroMuestra', 'nombreObra', 'tipoMuestraCilindro', 'fechadeToma','peso','forma','idForma']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { }

}
