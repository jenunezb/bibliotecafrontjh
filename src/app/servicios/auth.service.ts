import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SesionDto } from '../modelo/sesion-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { CiudadGetDto } from '../modelo/ciudad-get-dto';
import { SedesGetDTO } from '../modelo/sedes-dto';
import { EmpresasGetDTO } from '../modelo/empresas-get-dto ';
import { ObrasDto } from '../modelo/obras-get-dto';
import { CilindroGetDto } from '../modelo/cilindro-get-dto';
import { FechasReporteDto } from '../modelo/fechas-reporte-dto';
import { SeccionDto } from '../modelo/SeccionDto';
import { EdadesDto } from '../modelo/edades-get-dto';
import { OrdenDto } from '../modelo/orden-dto';

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

  public listarObras(): Observable<ObrasDto> {
    return this.http.get<ObrasDto>(`${this.authURL}/listarObras`);
  } 
  public listarSedes():Observable<SedesGetDTO>{
    return this.http.get<SedesGetDTO>(`${this.authURL}/listarSedes`);
  }  
  public listarCilindros(): Observable<CilindroGetDto[]>{
    return this.http.get<CilindroGetDto[]>(`${this.authURL}/listarCilindros`);
  }
  public listarReporte(fechasReporteDto:FechasReporteDto):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/listarReportes`, fechasReporteDto);
  }
  public listarSuelos ():Observable<SeccionDto>{
    return this.http.get<SeccionDto>(`${this.authURL}/listarSuelos`);
  } 

  public listarOrden (orden: OrdenDto):Observable<EdadesDto>{
    return this.http.post<EdadesDto>(`${this.authURL}/listarOrden`, orden);
  }
}
