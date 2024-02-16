import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SesionDTO } from '../modelo/sesion-dto';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/api/auth';
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public crear(usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear`, usuario);
  }

  public login(sesion: SesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  public registrar(usuario:UsuarioDTO):Observable<MensajeDTO>{
    console.log("pasa");
    return this.http.post<MensajeDTO>(`${this.authURL}/registro`, usuario);
    }
  
  public estaAutenticado(): boolean {
      let codigo = this.tokenService.getCodigo();
      if(codigo!=0){
        return true;
      }
      return false;
  }
}
