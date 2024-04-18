import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';

@Component({
  selector: 'app-orden-concretos',
  templateUrl: './orden-concretos.component.html',
  styleUrls: ['./orden-concretos.component.css']
})
export class OrdenConcretosComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['obra','cr', 'muestra', 'seccion', 'fechadeToma', 'fechadeFalla','edad','acciones']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;

}
