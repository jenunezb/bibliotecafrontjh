import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent {

  dataSource = new MatTableDataSource<EmpresasGetDTO>([]);
  displayedColumns: string[] = ['Nit', 'Nombre', 'Dirección', 'Teléfono','Acciones'];
  alerta: { mensaje: string, tipo: string } | null = null;
  nit: string = '';
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  camposIncompletos: boolean = false;
  mostrarErrorNitRepetido: boolean = false;

  

  constructor(
    private adminService: AdministradorService,
    private router: Router
  ) {}

  registrar(): void {
    // Validar que todos los campos estén llenos antes de registrar
    if (!this.nit || !this.nombre || !this.direccion || !this.telefono) {
      this.camposIncompletos = true;
      this.mostrarErrorNitRepetido = false; // Ocultar la alerta de NIT repetido
      return;
    }
  
    // Llamar al servicio para agregar la empresa en el backend
    this.adminService.agregarEmpresa(this.nit, this.nombre, this.direccion, this.telefono).subscribe({
      next: (data) => {
        // En caso de éxito, mostrar mensaje de éxito con estilo
        this.mostrarAlerta('¡La empresa ha sido creada!', 'success');
        alert('¡La empresa ha sido creada!'); // Mostrar alerta con mensaje de éxito
        window.close(); // Cerrar la ventana (opcional)
      },
      error: (error) => {
        console.error('Error al registrar la empresa:', error);
        if (error && error.error && typeof error.error === 'string') {
          // Mostrar mensaje de error del backend con estilo de error
          this.mostrarAlerta(error.error, 'danger');
        } else {
          // Mostrar mensaje de error genérico de NIT repetido
          this.mostrarErrorNitRepetido = true;
          this.camposIncompletos = false; // Ocultar la alerta de campos incompletos si estaba abierta
        }
      },
      complete: () => {
        // Restablecer las propiedades de visibilidad al finalizar la solicitud
        this.camposIncompletos = false;
        this.mostrarErrorNitRepetido = false;
      }
    });
  }
  
  // Función para mostrar alerta con estilo específico
  mostrarAlerta(mensaje: string, tipo: string): void {
    this.alerta = { mensaje: mensaje, tipo: tipo };
  }

  // Función para detectar cambios en los campos y ocultar el mensaje de error si todos los campos están llenos
  detectarCambios(): void {
    if (this.nit && this.nombre && this.direccion && this.telefono) {
      this.camposIncompletos = false; // Ocultar alerta de campos incompletos si el NIT está repetido
      this.mostrarErrorNitRepetido = true; // Mostrar alerta de NIT repetido
    } else {
      this.camposIncompletos = false; // Ocultar alerta de campos incompletos si no hay errores
      this.mostrarErrorNitRepetido = false; // Ocultar alerta de NIT repetido si no hay errores
    }
}
}
