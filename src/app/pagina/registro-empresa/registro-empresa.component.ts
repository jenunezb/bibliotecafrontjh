import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

  dataSource = new MatTableDataSource<EmpresasGetDTO>([]);
  displayedColumns: string[] = ['Nit','Nombre','Dirección','Teléfono'];

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/registro-empresa']); 
    }
  }

  
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService){

  }
}
