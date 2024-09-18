import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = "SteelSoft";
  isLogged = false;
  roles: string[] = [];
  email: string = "";
  seccionActiva: string = '';

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    // Verificar si el usuario ya está autenticado
    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.roles = this.tokenService.getRole();  
    }
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

  logout() {
    this.tokenService.logout();
  }
}
