// registro-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CiudadGetDto } from 'src/app/modelo/ciudad-get-dto';
import { SesionDto } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormsModule } from '@angular/forms';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit{

  dataSource = new MatTableDataSource<CiudadGetDto>([]);
  displayedColumns: string[] = ['nombre'];
  usuarioDto: UsuarioDTO;

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-usuarios']); 
    }

    this.listarCiudades();
  }

  sesionDTO: SesionDto;
  
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){
    this.sesionDTO = new SesionDto();
    this.usuarioDto = new UsuarioDTO();
  }

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
}