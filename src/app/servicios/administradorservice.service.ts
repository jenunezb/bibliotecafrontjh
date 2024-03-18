import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngenieroGetDTO } from '../modelo/ingeniero-get-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private authURL = 'http://localhost:8080/api/administrador';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public listarIngenieros():Observable<IngenieroGetDTO>{
    return this.http.get<IngenieroGetDTO>(`${this.authURL}/listaIngenieros`);
  }
}
