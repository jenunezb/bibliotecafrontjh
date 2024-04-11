import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DigitadorDTO } from 'src/app/modelo/digitador-get-dto';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-digitador',
  templateUrl: './digitador.component.html',
  styleUrls: ['./digitador.component.css']
})
export class DigitadorComponent {

  dataSource = new MatTableDataSource<DigitadorDTO>([]);
  displayedColumns: string[] = ['cedula', 'nombre', 'ciudad', 'telefono', 'correo', 'acciones']; // Define las columnas que deseas mostrar
  alerta: Alerta | null = null;

  constructor(private administradorService: AdministradorService, tokenService: TokenService) {}

  ngOnInit(): void {
    this.listarDigitadores();
  }

  listarDigitadores(): void {
    this.administradorService.listarDigitadores()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de digitadores:', error);
        }
      
      );
  }
  eliminarDigitador(correo:string): void {
    if (confirm('¿Estás seguro de eliminar el Digitador?')) {
        this.administradorService.eliminarDigitador(correo).subscribe({
            next: data => {
                this.alerta = { mensaje: data.respuesta, tipo: "success" };
                // Vuelve a cargar la lista de ciudades después de eliminar
                this.listarDigitadores();
            },
            error: err => {
                this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
            }
        });
    }
}
buscarDigitadores(nombre: string): void {
  if (nombre.trim() === '') {
    // No se permite búsqueda con campo vacío
    this.listarDigitadores();
    return;
  }

  this.administradorService.buscarDigitador(nombre).subscribe(
    (digitadorEncontrado: any) => {
      if (digitadorEncontrado && digitadorEncontrado.cedula) {
      
        const digitadordto: DigitadorDTO = {
          cedula: digitadorEncontrado.cedula,
          nombre: digitadorEncontrado.nombre,
          ciudad: digitadorEncontrado.ciudad ? digitadorEncontrado.ciudad.nombre : '',
          Teléfono: digitadorEncontrado.Teléfono,
          correo: digitadorEncontrado.correo
        };

        // Actualizar el dataSource con el resultado transformado
        this.dataSource.data = [digitadordto];

        // Limpiar la alerta si la búsqueda fue exitosa
        this.alerta = null;
      } else {
        console.error('Respuesta del servicio no válida:', digitadorEncontrado);
        this.dataSource.data = []; // Vaciar la tabla si la respuesta no es válida
        this.alerta = { mensaje: 'No se encontró ningún digitador con ese nombre.', tipo: 'error' };
      }
    },
    error => {
      console.error('Error al buscar digitador:', error);
      this.dataSource.data = []; // Vaciar la tabla en caso de error
      this.alerta = { mensaje: 'Error al buscar digitador. Inténtalo de nuevo más tarde.', tipo: 'error' };
    }
  );
}
onBuscarInputChange(value: string): void {
  if (value.trim() === '') {
    this.listarDigitadores(); // Volver a cargar la lista completa cuando el campo de búsqueda esté vacío
  }
}

}

