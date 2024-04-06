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
  displayedColumns: string[] = ['Nit', 'Nombre', 'Dirección', 'Teléfono'];
  alerta: { mensaje: string, tipo: string } | null = null;
  nit: string = '';
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';

  constructor(
    private adminService: AdministradorService,
    private router: Router
  ) {}

  registrar(): void {
    if (!this.nit || !this.nombre || !this.direccion || !this.telefono) {
      this.alerta = { mensaje: 'Por favor completa todos los campos.', tipo: 'danger' };
      return;
    }

    this.adminService.agregarEmpresa(this.nit, this.nombre, this.direccion, this.telefono).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡La empresa ha sido creada!');
      
        window.close();
      },
      error: (err) => {
        this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
      }
    });
  }
}
