import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { SesionDto } from '../modelo/sesion-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { CiudadGetDto } from '../modelo/ciudad-get-dto';
import { SedesGetDTO } from '../modelo/sedes-dto';
import { EmpresasGetDTO } from '../modelo/empresas-get-dto ';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/api/auth';
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public login(sesion: SesionDto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  public estaAutenticado(): boolean {
    let codigo = this.tokenService.getCodigo();
    if(codigo!=0){
      return true;
    }
    return false;
  }

 public listarCiudades():Observable<CiudadGetDto>{
    return this.http.get<CiudadGetDto>(`${this.authURL}/ciudades`);
  }  
  
  public listarEmpresas():Observable<EmpresasGetDTO>{
    return this.http.get<EmpresasGetDTO>(`${this.authURL}/empresas`);
  }  

  public listarSedes():Observable<SedesGetDTO>{
    return this.http.get<SedesGetDTO>(`${this.authURL}/sedes`);
  }  
  
}
