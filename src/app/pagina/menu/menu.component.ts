import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionDto } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  isLogged = false;
  roles: string[] = [];
  email: string = "";
  mostrarUsuarios: boolean = false;
  mostrarEmpresas: boolean = false;
  mostrarEnsayos: boolean = false;
  mostrarSedes: boolean = false;
  

  ngOnInit() {
    // Verificar si el usuario ya está autenticado
    if (this.authService.estaAutenticado()) {
    }

    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.roles = this.tokenService.getRole();  
    }
  }
  
  sesionDTO: SesionDto;
  
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){
    this.sesionDTO = new SesionDto();
  }

  public logout() {
    this.tokenService.logout();
  }
  
}
