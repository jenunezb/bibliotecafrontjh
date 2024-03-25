import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { ConcretosDto } from 'src/app/modelo/concretos-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.css']
})
export class EnsayosComponent implements OnInit {
  
  dataSource = new MatTableDataSource<ConcretosDto>([]);
  displayedColumns: string[] = ['numerodeMuestra', 'Cr', 'proyecto','ensayo', 'fechadeToma','acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;

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