import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DigitadorDTO } from 'src/app/modelo/digitador-get-dto';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-digitador',
  templateUrl: './digitador.component.html',
  styleUrls: ['./digitador.component.css']
})
export class DigitadorComponent {

  dataSource = new MatTableDataSource<DigitadorDTO>([]);
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

