import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { Router } from '@angular/router';
import { SesionService } from './servicios/sesion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SteelSoft';
  isLogged = false;
  isAdmin = false;
  cedula: string = "";

  constructor(private tokenService: TokenService, private router: Router, private sesionService: SesionService) {

  }

  ngOnInit(): void {
    const objeto = this;

    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.cedula = this.tokenService.getCedula();
    }

    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
        this.isAdmin = this.tokenService.getRole().includes("MODERADOR");
      }
    });

    this.actualizarSesion(this.tokenService.isLogged());
    this.isAdmin = this.tokenService.getRole().includes("MODERADOR");
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.cedula = this.tokenService.getCedula();
    } else {
      this.cedula = "";
    }
  }

  public logout() {
    this.tokenService.logout();
  }
}
