import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { AdministradorService } from 'src/app/servicios/administradorservice.service'
import { ObrasDto } from 'src/app/modelo/obras-get-dto';

@Component({
  selector: 'app-registro-libro',
  templateUrl: './registro-libro.component.html',
  styleUrls: ['./registro-libro.component.css']
})
export class RegistroLibroComponent implements OnInit{

  dataSource = new MatTableDataSource<ObrasDto>([]);
  dataSources = new MatTableDataSource<ObrasDto>([]);
  displayedColumns: string[] = ['cr','nombre','direccion','telefono','ciudad', 'empresas','fechaInicio'];
  obrasDTO: ObrasDto;
  usuarioDto: UsuarioDTO;
  empresasDto: EmpresasGetDTO;
  alerta: { mensaje: string, tipo: string } | null = null;

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService,private adminService: AdministradorService){
    this.obrasDTO = new ObrasDto();
    this.usuarioDto = new UsuarioDTO();
    this.empresasDto = new EmpresasGetDTO();
   
  }
  ngOnInit() {
  this.listarCiudades();
  this.listarEmpresas();  }


  listarCiudades(): void{
    this.authService.listarCiudades()
    .subscribe(
      (response: any) => {
        confirm
        this.dataSource.data = response.respuesta; 
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Error al obtener la lista de ciudades:', error);
      }
    
    );
  }

  listarEmpresas(): void {
    this.authService.listarEmpresas()
      .subscribe(
        (response: any) => {
          this.dataSources.data = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de empresas:', error);
        }
      );
  }

  registrarObra(): void {

    console.log(this.obrasDTO);
    
    this.adminService.agregarObras(this.obrasDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡La obra ha sido creada!');
        window.close();
      },
      error: (err) => {
        }
    });
  }
}