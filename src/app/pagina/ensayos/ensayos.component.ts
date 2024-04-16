import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';


@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.css']
})
export class EnsayosComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['Cr','numeroMuestra', 'nombreObra', 'tipoMuestraCilindro', 'fechadeToma', 'acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { }

  
  ngOnInit(): void {

    this.listarCilindros();
  }
  
  listarCilindros(): void {
    this.administradorService.listarCilindros()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta;
          console.log(this.dataSource)
        },
        error => {
          console.error('Error al obtener la lista de cilindros:', error);
        }

      );
  }

}
