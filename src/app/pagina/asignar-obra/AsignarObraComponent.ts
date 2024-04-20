import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngenieroGetDTO } from 'src/app/modelo/ingeniero-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarObrasRequestDTO } from 'src/app/modelo/asignar-obras-dto';
import { ObraCr } from 'src/app/modelo/ObraCr';

@Component({
  selector: 'app-asignar-obra',
  templateUrl: './asignar-obra.component.html',
  styleUrls: ['./asignar-obra.component.css']
})
export class AsignarObraComponent implements OnInit {

  id: number = 0;
  alerta: { mensaje: string; tipo: string; } | null = null;
  dataSource = new MatTableDataSource<IngenieroGetDTO>([]);
  dataSources = new MatTableDataSource<ObraCr>([]);
  displayedColumns: string[] = ['cr', 'nombre', 'direccion', 'telefono', 'ciudad','nombreEmpresa', 'checkbox']; // Define las columnas que deseas mostrar
  asignarObras: AsignarObrasRequestDTO;

  constructor(private adminService: AdministradorService, private route: ActivatedRoute) {
    this.asignarObras= new AsignarObrasRequestDTO();
    this.asignarObras.listaObras = []; // Inicializar listaObras como un array vacío
  }


  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.id = Number(params['id']);
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
      },
      error => {
        console.error('Error al obtener la lista de obras:', error);
      }
    );
  }

  toggleSelection(row: any): void {
    // Verifica si el CR ya está seleccionado
    const index = this.asignarObras.listaObras.findIndex(obra => obra.cr === row.cr);
    if (index !== -1) {
      // Si ya está seleccionado, lo remueve de la lista
      this.asignarObras.listaObras.splice(index, 1);
    } else {
      // Si no está seleccionado, lo agrega a la lista
      this.asignarObras.listaObras.push({ cr: row.cr });
    }
  }

  guardarSeleccion(): void {
    this.asignarObras.codigoUsuario = this.id;
    this.adminService.asignarObra(this.asignarObras).subscribe(
      (response: any) => {
        this.dataSources.data = response.respuesta;
        // Cerrar la ventana después de guardar las obras seleccionadas
        window.close();
      },
      error => {
        console.error('Error al asignar las obras', error);
      }
    );
  
    alert('¡Se han guardado las obras seleccionadas!');
  }
  
}
