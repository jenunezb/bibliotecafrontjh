import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { CilindroGetDto } from 'src/app/modelo/cilindro-get-dto';

@Component({
  selector: 'app-informe-concretos',
  templateUrl: './informe-concretos.component.html',
  styleUrls: ['./informe-concretos.component.css']
})
export class InformeConcretosComponent implements OnInit {
  dataSource: CilindroGetDto[] = []; // Arreglo para almacenar los cilindros

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.listarCilindros();
  }

  listarCilindros(): void {
    this.administradorService.listarCilindros()
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
