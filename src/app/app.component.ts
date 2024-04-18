import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Laboratorio";
  isLogged = false;
  roles: string[] = [];
  email: string = "";

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.roles = this.tokenService.getRole();  
    }
  }

  public logout() {
    this.tokenService.logout();
  }

    // Método para verificar si la ruta actual es registro-usuarios
    // Método para verificar si la ruta actual es registro-usuarios
    isRouteIncluded(routesToExclude: string[]): boolean {
      const currentRoute = this.router.url;
      for (const route of routesToExclude) {
        if (currentRoute.startsWith(route)) {
          return true;
        }
      }
      return false;
    }
 
}
