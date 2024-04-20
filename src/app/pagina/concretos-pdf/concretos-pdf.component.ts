import { Component, ViewChild , ElementRef,  EventEmitter, Output } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';

@Component({
  selector: 'app-concretos-pdf',
  templateUrl: './concretos-pdf.component.html',
  styleUrls: ['./concretos-pdf.component.css']
})
export class ConcretosPdfComponent {

  dataSource: CilindroGetDto[] = [];
  ordenDto: OrdenDto = new OrdenDto(); // Instancia de OrdenDto

  constructor(private adminService: AdministradorService) {}

  ngOnInit(): void {
    this.listarCilindros();
  }

 listarCilindros(): void {
    this.adminService.listarCilindros()
      .subscribe(
        (response: any) => {
          this.dataSource = response.respuesta; // Asigna la respuesta al dataSource
          console.log(this.dataSource); // Verifica en consola que los datos se han recibido correctamente
        },
        error => {
          console.error('Error al obtener la lista de cilindros:', error);
        }
      );
  }
}

function ngAfterViewInit() {
    throw new Error('Function not implemented.');
  }
