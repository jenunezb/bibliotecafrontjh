import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { ObrasDto } from '../modelo/obras-get-dto';

@Injectable({
  providedIn: 'root'
})
export class IngenieroserviceService {

  private authURL = 'http://localhost:8080/api/ingeniero';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public listarObras(): Observable<ObrasDto> {
    return this.http.get<ObrasDto>(`${this.authURL}/listarObras`);
  }
}
