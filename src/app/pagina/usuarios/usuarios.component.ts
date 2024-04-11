import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdministradorDTO } from 'src/app/modelo/administrador-get-dto';
import { Alerta } from 'src/app/modelo/alerta';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  dataSource = new MatTableDataSource<AdministradorDTO>([]);
  displayedColumns: string[] = ['correo', 'acciones']; // Define las columnas que deseas mostrar
  correo:string='';
  alerta: Alerta | null = null;
  editingRowIndex: number | null = null;

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
startEditing(rowIndex: number): void {
  this.editingRowIndex = rowIndex;
}
saveChanges(): void {
  if (this.editingRowIndex !== null && this.editingRowIndex >= 0 && this.editingRowIndex < this.dataSource.data.length) {
    const modifiedRow = this.dataSource.data[this.editingRowIndex];
    const correo = modifiedRow.correo; // Obtener el correo de la fila modificada
    this.administradorService.editarAdministrador(correo).subscribe(
      (response) => {
        this.editingRowIndex = null; // Salir del modo de edición
        alert('¡El correo ha sido editado!');
        this.listarAdministradores(); // Actualizar la lista después de editar
      },
      (error) => {
        console.error('Error al editar el correo:', error);
        // Manejo de errores, mostrar mensaje al usuario, etc.
      }
    );
  }
}




onBuscarInputChange(value: string): void {
  if (value.trim() === '') {
    this.listarAdministradores(); // Volver a cargar la lista completa cuando el campo de búsqueda esté vacío
  }
}
cancelEditing() {
  this.editingRowIndex = null; // Salir del modo de edición
}
buscarAdministrador(correo: string): void {
  if (correo.trim() === '') {
    // No se permite búsqueda con campo vacío
    this.listarAdministradores();
    return;
  }

  this.administradorService.buscarAdministrador(correo).subscribe(
    (empresaEncontrada: any) => {
      if (empresaEncontrada && empresaEncontrada.correo) {
        // Convertir la empresa encontrada a EmpresaDTO
        const administradorDto: AdministradorDTO = {
          correo: empresaEncontrada.correo,
          password: empresaEncontrada.password,
        };

        // Actualizar el dataSource con el resultado transformado
        this.dataSource.data = [administradorDto];

        // Limpiar la alerta si la búsqueda fue exitosa
        this.alerta = null;
      } else {
        console.error('Respuesta del servicio no válida:', empresaEncontrada);
        this.dataSource.data = []; // Vaciar la tabla si la respuesta no es válida
        this.alerta = { mensaje: 'Respuesta del servicio no válida.', tipo: 'error' };
      }
    },
    error => {
      console.error('Error al buscar empresas:', error);
      this.dataSource.data = []; // Vaciar la tabla en caso de error
      this.alerta = { mensaje: 'Error al buscar empresas. Inténtalo de nuevo más tarde.', tipo: 'error' };
    }
  );
}

}
