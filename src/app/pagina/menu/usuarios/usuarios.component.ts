import { Component } from '@angular/core';

export interface PeriodicElement {
  rol: string;
  nombre: string;
  apellido: string;
  sexo: string;
  firma: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { rol: 'Digitador', nombre: 'Sergio', apellido: 'Castaño', sexo: 'M', firma: 'firma' },
  { rol: 'Ingeniero', nombre: 'Alejandro', apellido: 'Echeverri', sexo: 'M' , firma: 'firma'},
  { rol: 'Administrador', nombre: 'Jeronimo', apellido: 'Nuñez', sexo: 'M', firma: 'firma' },
  { rol: 'Cliente', nombre: 'Rusver', apellido: 'Hidalgo', sexo: 'M', firma: 'firma' },
  { rol: 'Administrador', nombre: 'Julian', apellido: 'Suarez', sexo: 'M', firma: 'firma' },
  { rol: 'Cliente', nombre: 'Edgar', apellido: 'Diaz', sexo: 'M', firma: 'firma' }
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['rol', 'nombre', 'apellido', 'sexo','firma','acciones'];
  dataSource = ELEMENT_DATA;
}
