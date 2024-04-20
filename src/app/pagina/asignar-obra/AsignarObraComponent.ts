import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { ObrasDto } from 'src/app/modelo/obras-get-dto';

@Component({
  selector: 'app-asignar-obra',
  templateUrl: './asignar-obra.component.html',
  styleUrls: ['./asignar-obra.component.css']
})
export class AsignarObraComponent implements OnInit {
  id: number = 0;
  alerta: { mensaje: string; tipo: string; } | null = null;
  dataSource = new MatTableDataSource<IngenieroGetDTO>([]);
  dataSources = new MatTableDataSource<ObrasDto>([]);
  displayedColumns: string[] = ['cr', 'nombre', 'direccion', 'telefono', 'ciudad','nombreEmpresa', 'checkbox']; // Define las columnas que deseas mostrar
  selectedCRs: number[] = []; // Lista de CRs seleccionados

  constructor(private adminService: AdministradorService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.id = params['cedula'];
    this.buscarIngeniero();
    this.listarObras();
  }

buscarIngeniero(): void {
  this.adminService.buscarIngeniero(this.id).subscribe({
    next: (usuario: IngenieroGetDTO) => {
      this.dataSource.data = [usuario];
    },
    error: (error: any) => {
      console.error('Error al obtener el ingeniero:', error);
    }
  });
}

listarObras(): void {
    this.adminService.listarObras().subscribe(
        (response: any) => {
          this.dataSources.data = response.respuesta;
          console.log(this.dataSources.data)
        },
        error => {
          console.error('Error al obtener la lista de obras:', error);
        }
      );
  }


  asignarObra(row: any): void {
    console.log("entra")
    if (row) {
      this.adminService.asignarObra(this.id).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
          alert('¡Se ha asignado el ingeniero a la obra!');
          window.close();
        },
        error: err => {
          this.alerta = { mensaje: err.error.respuesta, tipo: 'danger' };
        }
      });
    }
  }


  toggleSelection(row: any): void {
    // Verifica si el CR ya está seleccionado
    const index = this.selectedCRs.indexOf(row.cr);
    if (index !== -1) {
      // Si ya está seleccionado, lo remueve de la lista
      this.selectedCRs.splice(index, 1);
    } else {
      // Si no está seleccionado, lo agrega a la lista
      this.selectedCRs.push(row.cr);
    }
  }

  guardarSeleccion(): void {
    console.log('CRs seleccionados:', this.selectedCRs);
    alert('¡Se han guardado las obras seleccionadas!');
  }
}
