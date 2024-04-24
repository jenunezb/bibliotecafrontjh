import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { RegistroCilindroDto } from 'src/app/modelo/registro-cilindro-dto';

@Component({
  selector: 'app-registro-cilindro',
  templateUrl: './registro-cilindro.component.html',
  styleUrls: ['./registro-cilindro.component.css']
})
export class RegistroCilindroComponent implements OnInit {

  dataSource = new MatTableDataSource<RegistroCilindroComponent>([]);
  cilindroDto: RegistroCilindroDto;
  alerta: { mensaje: string, tipo: string } | null = null;
  roles: string[] = [];


  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-cilindro']); 
      this.listaSeccion();
      this.roles = this.tokenService.getRole();  

    }
  }

  constructor(private adminService: AdministradorService, private authService: AuthService, private router: Router, private tokenService: TokenService){
    this.cilindroDto = new RegistroCilindroDto();
  }

  registroCilindro(): void {
    console.log(this.cilindroDto);
    this.adminService.agregarCilindro(this.cilindroDto).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡El cilindro ha sido creado!');
        window.close();
      },
      error: (err) => {
        console.error('Error al registrar el cilindro:', err);
      }
    });
  }

  listaSeccion(): void{
    this.adminService.listaSeccion()
    .subscribe(
      (response: any) => {
        confirm
        this.dataSource.data = response.respuesta; 
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Error al obtener la lista de secciones:', error);
      }
    
    );
  }
}