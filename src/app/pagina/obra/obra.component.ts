import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { ObrasDto } from 'src/app/modelo/obras-get-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { Alerta } from 'src/app/modelo/alerta';
import { TokenService } from 'src/app/servicios/token.service';



@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.css']
})
export class ObraComponent implements OnInit{

  dataSource = new MatTableDataSource<ObrasDto>([]);
  displayedColumns: string[] = ['cr', 'nombre', 'direccion', 'telefono', 'ciudad','nombreEmpresa']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  usuarioDto: UsuarioDTO;
  empresaDto: EmpresasGetDTO;
  roles: string[] = [];


  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService,private tokenService: TokenService) { 
  this.usuarioDto = new UsuarioDTO();
  this.empresaDto = new EmpresasGetDTO();
  }
  ngOnInit(): void {
    this.listarObras();

    this.roles = this.tokenService.getRole();  

  }
  
  listarObras(): void {
    this.authService.listarObras()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de obras:', error);
        }
      );
  }

}
