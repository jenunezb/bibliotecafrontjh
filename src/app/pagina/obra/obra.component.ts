import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { ObrasDto } from 'src/app/modelo/obras-get-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { Alerta } from 'src/app/modelo/alerta';


@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.css']
})
export class ObraComponent {

  dataSource = new MatTableDataSource<ObrasDto>([]);
  displayedColumns: string[] = ['Cr', 'nombre', 'direccion', 'telefono', 'ciudad','nitEmpresa', 'fechaInicio','acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  usuarioDto: UsuarioDTO;
  empresaDto: EmpresasGetDTO;

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { 
  this.usuarioDto = new UsuarioDTO();
  this.empresaDto = new EmpresasGetDTO();
  }
  ngOnInit(): void {


  }
}