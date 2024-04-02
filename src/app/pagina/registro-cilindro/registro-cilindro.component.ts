import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EnsayosComponent } from '../ensayos/ensayos.component';

@Component({
  selector: 'app-registro-cilindro',
  templateUrl: './registro-cilindro.component.html',
  styleUrls: ['./registro-cilindro.component.css']
})
export class RegistroCilindroComponent implements OnInit {

  dataSource = new MatTableDataSource<EnsayosComponent>([]);
  displayedColumns: string[] = ['Numero de muestra','Cr','Proyecto','Ensayo','Fecha de toma'];

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-cilindro']); 
    }
  }

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){

  }
}

