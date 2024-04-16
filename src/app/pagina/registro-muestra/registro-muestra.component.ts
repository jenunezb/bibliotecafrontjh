import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EdadesDto } from 'src/app/modelo/edades-get-dto';
import { MuestrasGetDTO } from 'src/app/modelo/muestrasGTO';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-registro-muestra',
  templateUrl: './registro-muestra.component.html',
  styleUrls: ['./registro-muestra.component.css']
})
export class RegistroMuestraComponent {

edadesGetDto: EdadesDto;
id:number=0;
constructor(private adminService: AdministradorService, private route: ActivatedRoute,){
this.edadesGetDto = new EdadesDto();
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
}

