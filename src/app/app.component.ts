import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Alerta } from 'src/app/modelo/alerta';
import { Router } from '@angular/router';
import { SesionDto } from './modelo/sesion-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  isLogged = false;
  roles: string[] = [];
  email: string = "";
  sesionDTO: SesionDto;
  alerta!: Alerta;

  ngOnInit() {
    // Verificar si el usuario ya está autenticado
    if (this.authService.estaAutenticado()) {
      // Redirigir a la página principal o el dashboard
      this.router.navigate(['/dashboard']); // Reemplaza '/dashboard' con tu ruta deseada
    }

    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.roles = this.tokenService.getRole();  
    }
  }

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){
  this.sesionDTO = new SesionDto();
  }

  public login(){
    this.authService.login(this.sesionDTO).subscribe({
    next: data => {
    this.tokenService.login(data.respuesta.token);
  },

  error: err => {
      this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
     
  }
});
  }

  public logout() {
    this.tokenService.logout();
  }

}
