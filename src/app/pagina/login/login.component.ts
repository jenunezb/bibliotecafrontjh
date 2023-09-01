import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = true;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {

  }
  ingresar() {

    const email = this.form.value.email;
    const password = this.form.value.password;

    console.log(email);
    console.log(password);


    if (email == 'proyectogrado@gmail.com' && password == 'holamundo') {
      //lo llevamos al menu
    } else {
      //mostramos un mensaje
      this.error();
    }
  }

  error() {
    this._snackBar.open('Email o contraseña invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading() {

    setTimeout(() => {
      this.loading = false;
      //redireccionamos al menu
      this.router.navigate(['menu']);
    }, 1500);
  }
}




