import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdministradorDTO } from 'src/app/modelo/administrador-get-dto';
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
  
  dataSource = new MatTableDataSource<AdministradorDTO>([]);
  displayedColumns: string[] = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones'];  
  alerta: Alerta | null = null;
  seccionActiva: string = ''; 
  editingRowIndex: number | null = null;
  titulo = 'Usuarios';


  constructor(private administradorService: AdministradorService, tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.cambiarSeccion('usuarios');
  }

  listarAdministradores(): void {

    this.displayedColumns = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones'];
    this.titulo = 'Administradores';
    this.administradorService.listarAdministradores()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de Administradores:', error);
        }
      );
  }

  listarIngenieros(): void {
    this.displayedColumns = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones'];
    this.titulo = 'Ingenieros';
    this.administradorService.listarIngenieros()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de Ingenieros:', error);
        }
      );
  }

  listarDigitadores(): void {
    this.displayedColumns = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones'];
    this.titulo = 'Digitadores';
    this.administradorService.listarDigitadores()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de Digitadores:', error);
        }
      );
  }

  listarClientes(): void {
    this.displayedColumns = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo','cargo', 'acciones']; 
    this.titulo = 'Clientes';
    console.log("entra a clientes")
    this.administradorService.listarClientes()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de Digitadores:', error);
        }
      );
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    switch(seccion) {
      case 'usuarios':
        this.listarAdministradores();
        break;
      case 'ingenieros':
        this.listarIngenieros();
        break;
      case 'digitadores':
        this.listarDigitadores();
        break;
      case 'clientes':
        this.listarClientes();
        break;
      default:
        console.error('Sección no válida:', seccion);
        break;
    }
  }

  seleccionarSeccion(event: any) {
    const seccionSeleccionada = event?.target?.value;
    if (seccionSeleccionada) {
        this.cambiarSeccion(seccionSeleccionada);
    }
  }

  startEditing(rowIndex: number): void {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(): void {
    if (this.editingRowIndex !== null && this.editingRowIndex >= 0 && this.editingRowIndex < this.dataSource.data.length) {
      const modifiedRow = this.dataSource.data[this.editingRowIndex] as unknown as IngenieroGetDTO; 
      console.log('Datos a editar:', modifiedRow); 
      this.administradorService.editarIngeniero(modifiedRow).subscribe(
        (response) => {
          this.editingRowIndex = null; 
          alert('¡El ingeniero ha sido editado!');
          this.listarIngenieros(); 
        },
        (error) => {
          console.error('Error al editar el ingeniero:', error);
        }
      );
    }
  }

  cancelEditing() {
    this.editingRowIndex = null; 
  }

  eliminarUsuario(correo:string): void {
    if (confirm('¿Estás seguro de eliminar el usuario?')) {
        this.administradorService.eliminarUsuario(correo).subscribe({
            next: data => {
                this.alerta = { mensaje: data.respuesta, tipo: "success" };
                this.listarIngenieros();
            },
            error: err => {
                this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
            }
        });
    }
  }

  asignarObra(id:string): void {
    window.open(`/asignar-obra/${id}`, 'Asignar obra', 'width=600, height=500');
  }

}