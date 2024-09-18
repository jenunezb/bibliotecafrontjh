import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroSuelosDto } from 'src/app/modelo/registroSuelos-get-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { GradacionDTO } from 'src/app/modelo/gradacion-dto';

@Component({
  selector: 'app-resultados-suelos',
  templateUrl: './resultados-suelos.component.html',
  styleUrls: ['./resultados-suelos.component.css']
})
export class ResultadosSuelosComponent {
  seccionActiva: string = ''
  id: number = 0;

  dataSource = new MatTableDataSource<GradacionDTO>;
  
  constructor(private route: ActivatedRoute, private router: Router, private administradorService: AdministradorService, private cdr: ChangeDetectorRef){}

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['codigo'];
      this.mostrarResultados();
    });
  }
  
  mostrarResultados(): void {
    this.administradorService.mostrarGradacion(this.id)
      .subscribe(
        (respuesta: any) => {
          // Crear un objeto GradacionDTO a partir de la respuesta
          const gradacion = new GradacionDTO();
          gradacion.cr = respuesta.respuesta.cr;
          gradacion.codigoMuestra = respuesta.respuesta.codigoMuestra;
          gradacion.fechaEnsayo = respuesta.respuesta.fechaEnsayo;
          gradacion.resultados = respuesta.respuesta.resultados;
          gradacion.tamices = respuesta.respuesta.tamices;
          gradacion.pesoAntesLavado = respuesta.respuesta.pesoAntesLavado;
  
          // Asignar el objeto GradacionDTO a dataSource.data
          this.dataSource.data = [gradacion];
          console.log(this.dataSource.data);
          // Forzar la detección de cambios después de asignar los datos
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error al obtener la lista de muestras de suelo:', error);
        }
      );
  }
  
}
