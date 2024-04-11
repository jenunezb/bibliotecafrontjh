import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Alerta } from 'src/app/modelo/alerta';


@Component({
  selector: 'app-ingeniero',
  templateUrl: './ingeniero.component.html',
  styleUrls: ['./ingeniero.component.css']
})
export class IngenieroComponent {

  dataSource = new MatTableDataSource<IngenieroGetDTO>([]);
  displayedColumns: string[] = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;
  constructor(private administradorService: AdministradorService, tokenService: TokenService) {}
  editingRowIndex: number | null = null;

  ngOnInit(): void {
    this.listarIngenieros();
  }

  listarIngenieros(): void {
    this.administradorService.listarIngenieros()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de ingenieros:', error);
        }
      
      );
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
buscarIngenieros(nombre: string): void {
  if (nombre.trim() === '') {
    // No se permite búsqueda con campo vacío, listar todos los ingenieros
    this.listarIngenieros();
    return;
  }

  this.administradorService.buscarIngeniero(nombre).subscribe(
    (ingenieroEncontrado: any) => {
      if (ingenieroEncontrado && ingenieroEncontrado.cedula) {
        // Crear un DTO con los datos del ingeniero encontrado
        const ingenieroDTO: IngenieroGetDTO = {
          cedula: ingenieroEncontrado.cedula,
          nombre: ingenieroEncontrado.nombre,
          ciudad: ingenieroEncontrado.ciudad ? ingenieroEncontrado.ciudad.nombre : '', // Obtener el nombre de la ciudad si está disponible
          Teléfono: ingenieroEncontrado.Teléfono? ingenieroEncontrado.Teléfonoe : '',
          correo: ingenieroEncontrado.correo
        };

        // Actualizar el dataSource con el resultado transformado
        this.dataSource.data = [ingenieroDTO];
        this.alerta = null; // Limpiar la alerta si la búsqueda fue exitosa
      } else {
        console.error('Respuesta del servicio no válida:', ingenieroEncontrado);
        this.dataSource.data = []; // Vaciar el dataSource si no se encontró ningún ingeniero
        this.alerta = { mensaje: 'No se encontró ningún ingeniero con ese nombre.', tipo: 'error' };
      }
    },
    error => {
      console.error('Error al buscar ingenieros:', error);
      this.dataSource.data = []; // Vaciar el dataSource en caso de error
      this.alerta = { mensaje: 'Error al buscar ingenieros. Inténtalo de nuevo más tarde.', tipo: 'error' };
    }
  );
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
    const modifiedRow = this.dataSource.data[this.editingRowIndex] as IngenieroGetDTO; // Asegúrate de que modifiedRow sea del tipo IngenieroGetDTO
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
}
