import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MuestrasGetDTO } from 'src/app/modelo/muestrasGTO';

@Component({
  selector: 'app-registro-muestra',
  templateUrl: './registro-muestra.component.html',
  styleUrls: ['./registro-muestra.component.css']
})
export class RegistroMuestraComponent {


  displayedColumns: string[] = ['edadTalla', 'NumeroCilindro'];
  dataSource = new MatTableDataSource<MuestrasGetDTO>([
    { edaddetalla : 'Ciudad A', numeroCilindro: "100000" },
    { edaddetalla: 'Ciudad B', numeroCilindro:  "100000" },
    { edaddetalla: 'Ciudad C', numeroCilindro:  "100000" }
  ]);
}

