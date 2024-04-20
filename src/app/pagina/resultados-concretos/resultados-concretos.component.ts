import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { OrdenDto } from 'src/app/modelo/orden-dto';


@Component({
  selector: 'app-resultados-concretos',
  templateUrl: './resultados-concretos.component.html',
  styleUrls: ['./resultados-concretos.component.css']
})
export class ResultadosConcretosComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['Cr','numeroMuestra', 'nombreObra', 'tipoMuestraCilindro', 'fechadeToma','peso','forma','idForma']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;
  seccionActiva: string = ''; // Variable para controlar la sección activa
  mostrarOrdenConcretos: boolean = false;
  editState: { [key: string]: boolean } = {};
  ordenDto: OrdenDto = new OrdenDto(); // Instancia de OrdenDto


  // Método para activar el modo de edición de un campo al hacer clic en él
  activateEditMode(column: string) {
    this.editState[column] = true;
  }
  
  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { }

  cambiarSecciones(seccion: string) {
    console.log('Cambiar sección a:', seccion);
    if (seccion === 'orden-concretos') {
      this.mostrarOrdenConcretos = true;
    } else {
      this.mostrarOrdenConcretos = false;
    }
  }
  
  listarCilindros(): void {
    this.administradorService.listarResultados(this.ordenDto)
      .subscribe(
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

  eliminarCilindro(id: number): void {
    if (confirm('¿Estás seguro de eliminar el cilindro?')) {
      this.administradorService.eliminarCilindro(id).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
          alert('¡El cilindro ha sido eliminado!');
          this.listarCilindros();
        },
        error: err => {
          this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
        }
      });
    }
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }

  openWindow(id: string): void {
    window.open(`/registro-muestra/${id}`, 'Crear Cilindro', 'width=600, height=500');
}

subirResultados(): void{
  this.administradorService.subirResultados(this.dataSource.data).subscribe({
    next: data => {
      this.alerta = { mensaje: data.respuesta, tipo: "success" };
      alert('¡Se han subido los resultados exitosamente!');
      this.listarCilindros();
    },
    error: err => {
      this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
    }
  });
  }

}