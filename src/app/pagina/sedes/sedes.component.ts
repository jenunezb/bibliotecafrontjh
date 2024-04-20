import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { SedesGetDTO } from 'src/app/modelo/sedes-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  dataSource = new MatTableDataSource<SedesGetDTO>([]);
  displayedColumns: string[] = ['ciudad', 'direccion', 'telefono','acciones']; // Define las columnas que deseas mostrar
  ciudad: string = '';
  alerta: Alerta | null = null;
  editingRowIndex: number | null = null;
  roles: string[] = [];

  constructor(private authService: AuthService,private adminService: AdministradorService,private tokenService: TokenService) {}

  ngOnInit(): void {
    this.listarSedes();

    this.roles = this.tokenService.getRole();  
}

  public listarSedes(): void{
    this.adminService.listarSedes()
    .subscribe(
      (response: any) => {
        confirm
        this.dataSource.data = response.respuesta; 
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Error al obtener la lista de sedes:', error);
      }
    
    );
  }
  eliminarSede(ciudad: string): void {
    if (confirm('¿Estás seguro de eliminar la sede?')) {
      this.adminService.eliminarSedes(ciudad).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
          alert('¡La sede ha sido eliminada!');
          this.listarSedes();
        },
        error: err => {
          this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
        }
      });
    }
  }
   // Método para activar el modo de edición en una fila específica
   startEditing(rowIndex: number): void {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(): void {
    if (this.editingRowIndex !== null && this.editingRowIndex >= 0 && this.editingRowIndex < this.dataSource.data.length) {
      const modifiedRow = this.dataSource.data[this.editingRowIndex];
      console.log('Datos a editar:', modifiedRow); // Agrega este console log para ver los datos que se están enviando a editarSede
      this.adminService.editarSede(modifiedRow).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response); // Agrega este console log para ver la respuesta del servidor
          this.editingRowIndex = null; // Salir del modo de edición
          alert('¡La sede ha sido editada!');
          this.listarSedes(); // Actualizar la lista de empresas después de editar
        },
        (error) => {
          console.error('Error al editar la sede:', error);
          // Manejo de errores, mostrar mensaje al usuario, etc.
        }
      );
    }
  }
  
  
  buscarSedes(nombre: string): void {
    if (nombre.trim() === '') {
      // No se permite búsqueda con campo vacío
      this.listarSedes();
      return;
    }

    this.adminService.buscarSede(nombre).subscribe(
      (sedeEncontrada: any) => {
        if (sedeEncontrada && sedeEncontrada.ciudad) {
          // Convertir la empresa encontrada a EmpresaDTO
          const sedesDto: SedesGetDTO = {
            ciudad: sedeEncontrada.ciudad,
            direccion: sedeEncontrada.direccion,
            telefono: sedeEncontrada.telefono
          };

          // Actualizar el dataSource con el resultado transformado
          this.dataSource.data = [sedesDto];

          // Limpiar la alerta si la búsqueda fue exitosa
          this.alerta = null;
        } else {
          console.error('Respuesta del servicio no válida:', sedeEncontrada);
          this.dataSource.data = []; // Vaciar la tabla si la respuesta no es válida
          this.alerta = { mensaje: 'Respuesta del servicio no válida.', tipo: 'error' };
        }
      },
      error => {
        console.error('Error al buscar sedes:', error);
        this.dataSource.data = []; // Vaciar la tabla en caso de error
        this.alerta = { mensaje: 'Error al buscar sedes. Inténtalo de nuevo más tarde.', tipo: 'error' };
      }
    );
  }
  onBuscarInputChange(value: string): void {
    if (value.trim() === '') {
      this.listarSedes(); // Volver a cargar la lista completa cuando el campo de búsqueda esté vacío
    }
  }
  cancelEditing() {
    this.editingRowIndex = null; // Salir del modo de edición
  }
  

}