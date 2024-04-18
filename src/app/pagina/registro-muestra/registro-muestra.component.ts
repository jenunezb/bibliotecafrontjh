import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EdadesDto } from 'src/app/modelo/edades-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-registro-muestra',
  templateUrl: './registro-muestra.component.html',
  styleUrls: ['./registro-muestra.component.css']
})
export class RegistroMuestraComponent {

  edades: EdadesDto[] = []; // Lista para almacenar las edades de las muestras
id:number=0;
alerta: { mensaje: string, tipo: string } | null = null;

constructor(private adminService: AdministradorService, private route: ActivatedRoute,){
}

ngOnInit(): void {
  // Obtener el ID de la URL
  this.route.params.subscribe(params => {
    this.id = params['id'];
    console.log(this.id);
    // Llamar a la función para listar edades
    this.listarEdades();
  });
}

  displayedColumns: string[] = ['edad', 'muestra'];
  dataSource = new MatTableDataSource<EdadesDto>([]);

public listarEdades():void{
  this.adminService.listarEdades(this.id).subscribe(
    (response: any) => {
      confirm
      this.dataSource.data = response.respuesta;
      console.log(this.dataSource.data);
    },
    error => {
      console.error('Error al obtener la lista de cilindros:', error);
    }
  );
}

// Método para guardar las edades
public guardarEdades(): void {

  this.edades=this.dataSource.data;

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
}