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
  displayedColumns: string[] = ['nit', 'nombre', 'direccion', 'telefono', 'acciones']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null; 

  constructor(private authService: AuthService, private adminService: AdministradorService) {}

  ngOnInit(): void {
    this.listarEmpresas(); // Cargar empresas al inicializar el componente
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
      this.dataSource.data = [];
      this.alerta = { mensaje: 'Debe ingresar un nombre para buscar.', tipo: 'info' };
      return;
    }

    this.adminService.buscarEmpresas(nombre).subscribe(
      (empresas: EmpresasGetDTO[]) => {
        if (empresas.length === 0) {
          this.alerta = { mensaje: 'No se encontraron empresas con ese nombre.', tipo: 'info' };
        } else {
          this.alerta = null; // Limpiar la alerta si se encontraron resultados
        }
        // Actualizar la tabla con los resultados de la búsqueda
        this.dataSource.data = empresas;
      },
      error => {
        console.error('Error al buscar empresas:', error);
        this.dataSource.data = []; // Vaciar la tabla en caso de error
        this.alerta = { mensaje: 'Error al buscar empresas. Inténtalo de nuevo más tarde.', tipo: 'error' };
      }
    );
  }

  delete(empresasGetDTO: EmpresasGetDTO): void {
    this.adminService.deleteEmpresa(empresasGetDTO.nit).subscribe(
      () => {
        console.log('Empresa eliminada correctamente');
        this.adminService.listarEmpresas().subscribe(
          (error) => {
            console.error('Error al obtener la lista de empresas:', error);
          }
        );
      },
      (error) => {
        console.error('Error al eliminar la empresa:', error);
      }
    );
  }

}