import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngenieroGetDTO } from '../modelo/ingeniero-get-dto';
import { CiudadGetDto } from '../modelo/ciudad-get-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private authURL = 'http://localhost:8080/api/administrador';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public listarIngenieros(): Observable<IngenieroGetDTO> {
    return this.http.get<IngenieroGetDTO>(`${this.authURL}/listaIngenieros`);
  }

  public agregarCiudad(ciudad: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarCiudad`, ciudad);
  }

  public eliminarCiudad(ciudad: string): Observable<MensajeDTO> {
    // Imprime la URL antes de enviar la solicitud
    console.log('URL de eliminación de ciudad:', `${this.authURL}/eliminarCiudad/${ciudad}`);
    // La información de la ciudad se pasa como parte de la URL
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarCiudad/${ciudad}`);
  }
}
