import { Component, OnInit,HostListener  } from '@angular/core';
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

  title = "SteelSoft";
  isLogged = false;
  roles: string[] = [];
  email: string = "";
  mostrarUsuarios: boolean = false;
  mostrarEmpresas: boolean = false;
  mostrarEnsayos: boolean = false;
  mostrarSuelos: boolean = false;
  mostrarAceros: boolean = false;
  mostrarSedes: boolean = false;
  seccionActiva: string = ''; // Variable para controlar la sección activa


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
  seleccionarSeccion(event: any) {
    const seccionSeleccionada = event.target.value;
    if (seccionSeleccionada) {
      this.cambiarSeccion(seccionSeleccionada);
    }
  }
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }


  public logout() {
    this.tokenService.logout();
  }
  }
  

