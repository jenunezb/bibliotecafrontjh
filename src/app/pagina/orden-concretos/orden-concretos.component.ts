import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-concretos',
  templateUrl: './orden-concretos.component.html',
  styleUrls: ['./orden-concretos.component.css']
})
export class OrdenConcretosComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['obra','cr', 'muestra', 'ensayo', 'fechadeToma', 'fechadeFalla','edad']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;
  seccionActiva: string = '';
  ordenDto: OrdenDto = new OrdenDto(); // Instancia de OrdenDto

  constructor(private adminService: AdministradorService,private router: Router) {}

  public listarOrden(): void {
    this.adminService.listarOrden(this.ordenDto)
      .subscribe(
        (response: any) => {
          this.dataSource.data = response.respuesta; 
          console.log(this.dataSource.data);
        },
        error => {
          console.error('Error al obtener la orden:', error);
        }
      );
  }
  
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }
}
