import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EdadesDto } from 'src/app/modelo/edades-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-registro-muestra',
  templateUrl: './registro-muestra.component.html',
  styleUrls: ['./registro-muestra.component.css']
})
export class RegistroMuestraComponent implements OnInit {
  id: number = 0;
  alerta: { mensaje: string, tipo: string } | null = null;
  edades: EdadesDto[] = [];
  displayedColumns: string[] = ['edad', 'muestra'];
  dataSource = new MatTableDataSource<EdadesDto>([]);

  constructor(private adminService: AdministradorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.listarEdades();
    });
  }

  listarEdades(): void {
    this.adminService.listarEdades(this.id).subscribe(
      (response: any) => {
        this.dataSource.data = response.respuesta;
        this.edades = response.respuesta; // Guardar edades en una propiedad local
      },
      error => {
        console.error('Error al obtener la lista de edades:', error);
      }
    );
  }

  guardarEdades(): void {
    // Llamar al servicio para guardar las edades
    this.adminService.guardarEdades(this.edades).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
        alert('¡Las edades han sido modificadas!');
        window.close();
      },
      error: err => {
        this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
      }
    });
  }

  onEdadChange(event: any, index: number): void {
    const newValue = event.target.value; 
    if (!isNaN(newValue)) {
      this.edades[index].edad = +newValue; 
    }
  }
}
