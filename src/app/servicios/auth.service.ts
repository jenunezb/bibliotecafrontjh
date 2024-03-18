import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { SesionDto } from '../modelo/sesion-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

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
    
}
