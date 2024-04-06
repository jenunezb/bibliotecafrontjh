import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngenieroGetDTO } from '../modelo/ingeniero-get-dto';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
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
  public agregarEmpresa(nit: string, nombre: string, direccion: string, telefono: string): Observable<MensajeDTO> {
    // Construir un objeto con los datos de la empresa
    const empresaData = { nit, nombre, direccion, telefono };

    // Realizar la solicitud POST enviando el objeto como el cuerpo de la solicitud
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarEmpresa`, empresaData);
  }
  public agregarUsuario(cedula: string, nombre: string, telefono: string, correo: string): Observable<MensajeDTO> {
    // Construir un objeto con los datos de la empresa
    const usuarioData = { cedula, nombre, telefono, correo };

    // Realizar la solicitud POST enviando el objeto como el cuerpo de la solicitud
    return this.http.post<MensajeDTO>(`${this.authURL}/listaIngenieros`, usuarioData);
  }
  public listarEmpresas(): Observable<EmpresasGetDTO[]> {
    return this.http.get<EmpresasGetDTO[]>(`${this.authURL}/listarEmpresas`);
  }

  public eliminarCiudad(ciudad: string): Observable<MensajeDTO> {
    // Imprime la URL antes de enviar la solicitud
    console.log('URL de eliminación de ciudad:', `${this.authURL}/eliminarCiudad/${ciudad}`);
    // La información de la ciudad se pasa como parte de la URL
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarCiudad/${ciudad}`);
  }
  public deleteEmpresa(nit: string) {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarEmpresa/${nit}`);
  }
  buscarEmpresas(nombre: string): Observable<EmpresasGetDTO[]> {
    const url = `${this.authURL}/buscarEmpresa/${nombre}`;
    console.log('URL de búsqueda de empresa:', url);
    return this.http.get<EmpresasGetDTO[]>(url);
  }
}
