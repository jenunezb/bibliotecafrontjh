import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDto } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isLogged = false;
  roles: string[] = [];
  email: string = "";
  sesionDTO: SesionDto;
  alerta!: Alerta;

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/menu']); 
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

}
