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
  displayedColumns: string[] = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones'];  alerta: Alerta | null = null;
  seccionActiva: string = ''; // Variable para almacenar la sección activa
  editingRowIndex: number | null = null;


  constructor(private administradorService: AdministradorService, tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.cambiarSeccion('usuarios'); // Por defecto, mostrará la lista de administradores al iniciar el componente
  }

  listarAdministradores(): void {
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
    console.log("entra a digitadores")
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

  eliminarAdministrador(correo: string): void {
    if (confirm('¿Estás seguro de eliminar el Administrador?')) {
        this.administradorService.eliminarAdministrador(correo).subscribe({
            next: data => {
                this.alerta = { mensaje: data.respuesta, tipo: "success" };
                this.listarAdministradores(); // Vuelve a cargar la lista después de eliminar
            },
            error: err => {
                this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
            }
        });
    }
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

// Método para activar el modo de edición en una fila específica
startEditing(rowIndex: number): void {
  this.editingRowIndex = rowIndex;
}

onBuscarInputChange(value: string): void {
  if (value.trim() === '') {
    this.listarIngenieros(); // Volver a cargar la lista completa cuando el campo de búsqueda esté vacío
  }
}

saveChanges(): void {
  if (this.editingRowIndex !== null && this.editingRowIndex >= 0 && this.editingRowIndex < this.dataSource.data.length) {
    const modifiedRow = this.dataSource.data[this.editingRowIndex] as unknown as IngenieroGetDTO; // Asegúrate de que modifiedRow sea del tipo IngenieroGetDTO
    console.log('Datos a editar:', modifiedRow); 
    this.administradorService.editarIngeniero(modifiedRow).subscribe(
      (response) => {
        this.editingRowIndex = null; // Salir del modo de edición
        alert('¡El ingeniero ha sido editado!');
        this.listarIngenieros(); // Actualizar la lista de ingenieros después de editar
      },
      (error) => {
        console.error('Error al editar el ingeniero:', error);
        // Manejo de errores, mostrar mensaje al usuario, etc.
      }
    );
  }
}

cancelEditing() {
  this.editingRowIndex = null; // Salir del modo de edición
}

eliminarIngeniero(correo:string): void {
  if (confirm('¿Estás seguro de eliminar el Ingeniero?')) {
      this.administradorService.eliminarDigitador(correo).subscribe({
          next: data => {
              this.alerta = { mensaje: data.respuesta, tipo: "success" };
              // Vuelve a cargar la lista de ciudades después de eliminar
              this.listarIngenieros();
          },
          error: err => {
              this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
          }
      });
  }
}


}