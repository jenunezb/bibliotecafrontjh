import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';

@Component({
  selector: 'app-informe-concretos',
  templateUrl: './informe-concretos.component.html',
  styleUrls: ['./informe-concretos.component.css']
})
export class InformeConcretosComponent implements OnInit {
  dataSource: CilindroGetDto[] = [];
  ordenDto: OrdenDto = new OrdenDto(); 
  primeraFechaToma: string = ""; // Propiedad para almacenar la fecha de toma del primer cilindro
  fechaActual: string = "";
  codigoConsecutivo: string = "";
  private contadorDocumentos: string = "0001";


  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.listarCilindros();
    this.obtenerFechaActual();
    this.generarCodigoConsecutivo();
  }
 
  listarCilindros(): void {
    this.administradorService.listarCilindros()
      .subscribe(
        (response: any) => {
          this.dataSource = response.respuesta.map((item: any) => {
            const cilindroDto = new CilindroGetDto();
            cilindroDto.cr = item.cr;
            cilindroDto.numeroMuestra = item.numeroMuestra; // Asumiendo que 'numeroMuestra' se asigna a 'muestra'
            cilindroDto.ensayo = item.ensayo; // Asignar 'ensayo' con valor predeterminado en caso de ser undefined
            cilindroDto.fechaToma = item.fechaToma;
            cilindroDto.fechaFalla = item.fechaFalla; // Asumiendo que 'fechaFalla' se asigna a 'fechaFalla'
            cilindroDto.edad = item.edad ?? 0 // Asignar 'edad' con valor predeterminado en caso de ser undefined
            cilindroDto.nombreObra = item.nombreObra; // Asumiendo que 'nombreObra' se asigna a 'obra'
            return cilindroDto;
          });
          console.log(this.dataSource);
          
          // Obtener la fecha de toma del primer cilindro si existe al menos uno en dataSource
          if (this.dataSource.length > 0) {
            this.primeraFechaToma = this.dataSource[0].fechaToma;
          }
          console.log(this.dataSource);
        },
        error => {
          console.error('Error al obtener la lista de cilindros:', error);
        }
      );
  }

  obtenerFechaActual(): void {
    const ahora = new Date();
    this.fechaActual = ahora.toISOString().substring(0, 10); // Formato YYYY-MM-DD
  }
  generarCodigoConsecutivo(): void {
    const numeroActual = parseInt(this.contadorDocumentos, 10);
    const siguienteNumero = numeroActual + 1;
    this.contadorDocumentos = siguienteNumero.toString().padStart(4, '0');
    this.codigoConsecutivo = `PF-L-04${this.contadorDocumentos}`;
  }
}

