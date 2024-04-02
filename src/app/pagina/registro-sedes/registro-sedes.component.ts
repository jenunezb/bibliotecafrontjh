import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { SedesGetDTO } from 'src/app/modelo/sedes-dto';
@Component({
  selector: 'app-registro-sedes',
  templateUrl: './registro-sedes.component.html',
  styleUrls: ['./registro-sedes.component.css']
})
export class RegistroSedesComponent implements OnInit {

  dataSource = new MatTableDataSource<SedesGetDTO>([]);
  displayedColumns: string[] = ['nombre','direccion','telefono'];

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-sedes']); 
    }
  }

  
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){

  }
}