import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  dataSource = new MatTableDataSource<EmpresasGetDTO>([]);
  displayedColumns: string[] = ['nit', 'nombre', 'direccion', 'telefono', 'acciones']; 
  alerta: Alerta | null = null;
  editingRowIndex: number | null = null;

  constructor(private authService: AuthService, private adminService: AdministradorService) {

  }

  ngOnInit(): void {
    this.listarEmpresas(); // Cargar empresas al inicializar el componente

  }
  // Método para activar el modo de edición en una fila específica
  startEditing(rowIndex: number): void {
    this.editingRowIndex = rowIndex;
  }

  saveChanges(): void {
    if (this.editingRowIndex !== null && this.editingRowIndex >= 0 && this.editingRowIndex < this.dataSource.data.length) {
      const modifiedRow = this.dataSource.data[this.editingRowIndex];
      this.adminService.editarEmpresa(modifiedRow).subscribe(
        (response) => {
          this.editingRowIndex = null; // Salir del modo de edición
          alert('¡La empresa ha sido editada!');
          this.listarEmpresas(); // Actualizar la lista de empresas después de editar
        },
        (error) => {
          console.error('Error al editar la empresa:', error);
          // Manejo de errores, mostrar mensaje al usuario, etc.
        }
      );
    }
  }

  listarEmpresas(): void {
    this.authService.listarEmpresas()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de empresas:', error);
        }
      );
  }

  buscarEmpresas(nombre: string): void {
    if (nombre.trim() === '') {
      // No se permite búsqueda con campo vacío
      this.listarEmpresas();
      return;
    }

    this.adminService.buscarEmpresas(nombre).subscribe(
      (empresaEncontrada: any) => {
        if (empresaEncontrada && empresaEncontrada.nit) {
          // Convertir la empresa encontrada a EmpresaDTO
          const empresaDTO: EmpresasGetDTO = {
            nit: empresaEncontrada.nit,
            nombre: empresaEncontrada.nombre,
            direccion: empresaEncontrada.direccion,
            telefono: empresaEncontrada.telefono
          };

          // Actualizar el dataSource con el resultado transformado
          this.dataSource.data = [empresaDTO];

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

  eliminarEmpresa(direccion: string): void {
    if (confirm('¿Estás seguro de eliminar la empresa?')) {
      this.adminService.eliminarEmpresa(direccion).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
          alert('¡La empresa ha sido eliminada!');
          this.listarEmpresas();
        },
        error: err => {
          this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
        }
      });
    }
  }
  onBuscarInputChange(value: string): void {
    if (value.trim() === '') {
      this.listarEmpresas(); // Volver a cargar la lista completa cuando el campo de búsqueda esté vacío
    }
  }
  cancelEditing() {
    this.editingRowIndex = null; // Salir del modo de edición
  }

}
