import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario:UsuarioDTO;
  alerta!:Alerta;
  roles: any[] = [];
  estados: any[] = [];

  constructor(private authService: AuthService,private usuarioService: UsuarioService) {
    this.usuario = new UsuarioDTO();

    this.usuarioService.roles().subscribe(
      respuesta => {
        this.roles = respuesta;
      },
      error => {
        console.error(error);
      }
    );

    this.usuarioService.estado().subscribe(
      respuesta => {
        this.estados = respuesta;
      },
      error => {
        console.error(error);
      }
    );
  }

  public registrar() {
    const objeto = this;
    this.authService.registrar(this.usuario).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.respuesta, "success");
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }
  
  public sonIguales():boolean{
    return this.usuario.password == this.usuario.confirmaPassword;
    }
}
