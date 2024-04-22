import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-informe-concretos',
  templateUrl: './informe-concretos.component.html',
  styleUrls: ['./informe-concretos.component.css']
})
export class InformeConcretosComponent implements OnInit {
  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  ordenDto: OrdenDto = new OrdenDto(); 
  primeraFechaToma: string = ""; // Propiedad para almacenar la fecha de toma del primer cilindro
  fechaActual: string = "";
  codigoConsecutivo: string = "";
  private contadorDocumentos: string = "0001";

  constructor(private administradorService: AdministradorService) {
    this.ordenDto = new OrdenDto();
   }

  ngOnInit(): void {
    this.listarCilindros();
    this.obtenerFechaActual();
    this.generarCodigoConsecutivo();
  }

  listarCilindros(): void {
    this.ordenDto.fecha="2024-04-22";
    this.ordenDto.cr="04265";
    this.administradorService.listarOrden(this.ordenDto).subscribe(
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

