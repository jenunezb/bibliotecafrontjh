import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroSuelosDto } from 'src/app/modelo/registroSuelos-get-dto';



@Component({
  selector: 'app-resultados-suelos',
  templateUrl: './resultados-suelos.component.html',
  styleUrls: ['./resultados-suelos.component.css']
})
export class ResultadosSuelosComponent {

  dataSource = new MatTableDataSource<ResultadosSuelosComponent>([]);
}
