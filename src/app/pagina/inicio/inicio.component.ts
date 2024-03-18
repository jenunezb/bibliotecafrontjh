import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDto } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  ngOnInit() {
    // Verificar si el usuario ya está autenticado
    if (this.authService.estaAutenticado()) {
      // Redirigir a la página principal o el dashboard
      this.router.navigate(['/dashboard']); // Reemplaza '/dashboard' con tu ruta deseada
    }
  }

  sesionDTO: SesionDto;
  alerta!: Alerta;

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

