import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-asignar-obra',
  templateUrl: './asignar-obra.component.html',
  styleUrls: ['./asignar-obra.component.css']
})
export class AsignarObraComponent {
  cedula: string = "";
  alerta: { mensaje: string, tipo: string } | null = null;
  usuario: UsuarioGetDTO;

  constructor(private adminService: AdministradorService, private route: ActivatedRoute) {
    this.usuario = new UsuarioGetDTO;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cedula = params['cedula'];
    });
  }

  asignarObra(): void {
    this.adminService.asignarObra(this.cedula).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
        alert('¡Se ha asignado el ingeniero a la obra!');
        window.close();
      },
      error: err => {
        this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
      }
    });
  }
}
