import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteDTO } from 'src/app/modelo/cliente-get-dto';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  dataSource = new MatTableDataSource<ClienteDTO>([]);
  displayedColumns: string[] = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones']; // Define las columnas que deseas mostrar

  constructor(private administradorService: AdministradorService, tokenService: TokenService) {}

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
