import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  dataSource = new MatTableDataSource<IngenieroGetDTO>([]);
  displayedColumns: string[] = ['correo', 'acciones']; // Define las columnas que deseas mostrar
  correo:string='';
  alerta!: Alerta;
  constructor(private administradorService: AdministradorService, tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.listarAdministradores();
  }

  listarAdministradores(): void {
    this.administradorService.listarAdministradores()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de Administradores:', error);
        }
      
      );
  }

  eliminarAdministrador(correo:string): void {
    if (confirm('¿Estás seguro de eliminar el Administrador?')) {
        this.administradorService.eliminarAdministrador(correo).subscribe({
            next: data => {
                this.alerta = { mensaje: data.respuesta, tipo: "success" };
                // Vuelve a cargar la lista de ciudades después de eliminar
                this.listarAdministradores();
            },
            error: err => {
                this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
            }
        });
    }
}
}
