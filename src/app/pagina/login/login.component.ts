import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Alerta } from 'src/app/modelo/alerta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = true;
  alerta!: Alerta;
  sesion: SesionDTO;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private authService: AuthService, private tokenService: TokenService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.sesion = new SesionDTO();
  }

  ingresar() {
    const email = this.sesion.email;
    const password = this.sesion.password;

    const objeto = this;

    console.log(this.sesion);

    this.authService.login(this.sesion).subscribe({
      next: data => {

        objeto.tokenService.login(data.respuesta.token);
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }

    });



    if (email == 'proyectogrado@gmail.com' && password == 'holamundo') {
      //lo llevamos al menu
      this.fakeLoading();
    }
  }

  fakeLoading() {
    this.loading = false;
    setTimeout(() => {

      //redireccionamos al menu
      this.router.navigate(['menu']);
    }, 1500);
  }

}
