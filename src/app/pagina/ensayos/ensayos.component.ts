import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';
import { TokenService } from 'src/app/servicios/token.service';



@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.css']
})
export class EnsayosComponent {

  dataSource = new MatTableDataSource<CilindroGetDto>([]);
  displayedColumns: string[] = ['Cr','numeroMuestra', 'nombreObra', 'tipoMuestraCilindro', 'fechadeToma', 'acciones']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;
  seccionActiva: string = ''; // Variable para controlar la sección activa
  mostrarOrdenConcretos: boolean = false;
  roles: string[] = [];

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService,private tokenService: TokenService) { }
  
  ngOnInit(): void {
    this.listarCilindros();
    this.roles = this.tokenService.getRole();  

  }
  cambiarSecciones(seccion: string) {
    console.log('Cambiar sección a:', seccion);
    if (seccion === 'orden-concretos') {
      this.mostrarOrdenConcretos = true;
    } else {
      this.mostrarOrdenConcretos = false;
    }
  }
  

  listarCilindros(): void {
    this.authService.listarCilindros()
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

}
