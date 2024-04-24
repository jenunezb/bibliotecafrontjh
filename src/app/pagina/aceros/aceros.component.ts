import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { ConcretosDto } from 'src/app/modelo/concretos-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-aceros',
  templateUrl: './aceros.component.html',
  styleUrls: ['./aceros.component.css']
})
export class AcerosComponent {

  dataSource = new MatTableDataSource<ConcretosDto>([]);
  displayedColumns: string[] = ['numerodeMuestra', 'Cr', 'proyecto', 'ensayo', 'fechadeToma', 'acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  roles: string[] = [];



  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService,private tokenService: TokenService) { }

  ngOnInit(): void {

    this.listarIngenieros();
  }
  
  listarIngenieros(): void {
    this.administradorService.listarIngenieros()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de ingenieros:', error);
        }

      );
  }

}

