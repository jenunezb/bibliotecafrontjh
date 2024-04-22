import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { RegistroSuelosDto } from 'src/app/modelo/registroSuelos-get-dto';



@Component({
  selector: 'app-registro-suelos',
  templateUrl: './registro-suelos.component.html',
  styleUrls: ['./registro-suelos.component.css']
})
export class RegistroSuelosComponent implements OnInit  {

  dataSource = new MatTableDataSource<RegistroSuelosComponent>([]);
  suelosDTO: RegistroSuelosDto;
  alerta: { mensaje: string, tipo: string } | null = null;


  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-suelos']); 
    }
  }

  constructor(private adminService: AdministradorService, private authService: AuthService, private router: Router, private tokenService: TokenService){
    this.suelosDTO = new RegistroSuelosDto();
  }
}
