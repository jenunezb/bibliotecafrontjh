import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource<IngenieroGetDTO>([]);
  displayedColumns: string[] = ['rol', 'nombre', 'apellido', 'sexo', 'firma']; // Define las columnas que deseas mostrar
  alerta!: Alerta;

  constructor(private administradorService: AdministradorService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.listarIngenieros();
  }

  listarIngenieros(): void {
    this.administradorService.listarIngenieros()
      .subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response); // Imprimir la respuesta por consola
          this.dataSource.data = response.data; 
        },
        error => {
          console.error('Error al obtener la lista de ingenieros:', error);
        }
      );
  }
}
