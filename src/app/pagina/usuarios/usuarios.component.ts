import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  dataSource = new MatTableDataSource<string>([]); 
  displayedColumns: string[] = ['rol', 'nombre', 'apellido', 'sexo', 'firma', 'acciones'];

}
