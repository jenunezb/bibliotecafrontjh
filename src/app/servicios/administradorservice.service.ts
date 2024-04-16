import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngenieroGetDTO } from '../modelo/ingeniero-get-dto';
import { EmpresasGetDTO } from 'src/app/modelo/empresas-get-dto ';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { SedesGetDTO } from '../modelo/sedes-dto';
import { DigitadorDTO } from '../modelo/digitador-get-dto';
import { ClienteDTO } from '../modelo/cliente-get-dto';
import { UsuarioGetDTO } from '../modelo/usuario-get-dto';
import { AdministradorDTO } from '../modelo/administrador-get-dto';
import { ObrasDto } from '../modelo/obras-get-dto';
import { CiudadGetDto } from '../modelo/ciudad-get-dto';
import { CilindroGetDto } from '../modelo/cilindro-get-dto';
import { RegistroCilindroDto } from '../modelo/registro-cilindro-dto';
import { SeccionDto } from '../modelo/SeccionDto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private authURL = 'http://localhost:8080/api/administrador';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public listarIngenieros(): Observable<IngenieroGetDTO> {
    return this.http.get<IngenieroGetDTO>(`${this.authURL}/listaIngenieros`);
  }

  public listarAdministradores(): Observable<IngenieroGetDTO> {
    return this.http.get<IngenieroGetDTO>(`${this.authURL}/listaAdministradores`);
  }

  public listarObras(): Observable<ObrasDto> {
    return this.http.get<ObrasDto>(`${this.authURL}/listarObras`);
  }
  public agregarObras(obrasDTO: ObrasDto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarObra`, obrasDTO);
  }

  public listarDigitadores(): Observable<DigitadorDTO> {
    return this.http.get<DigitadorDTO>(`${this.authURL}/listarDigitadores`);
  }

  public listarClientes(): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${this.authURL}/listarClientes`);
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

  public agregarAdministrador(usuarioDto: UsuarioDTO): Observable<MensajeDTO>{
    this.authURL = 'http://localhost:8080/api/auth';
    return this.http.post<MensajeDTO>(`${this.authURL}/crearAdministrador`, usuarioDto);
  }

  public agregarIngeniero(usuarioDto: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarIngeniero`, usuarioDto);
  }
  public agregarDigitador(usuarioDto: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarDigitador`, usuarioDto);
  }
  public agregarCliente(usuarioDto: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarCliente`, usuarioDto);
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

  editarAdministrador(correo: string): Observable<any> {
    const url = `${this.authURL}/editarAdministrador`;
    return this.http.put(url, { correo: correo });
  }
  public eliminarUsuario(correo: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarAdministrador/${correo}`);
  }
  public eliminarDigitador(correo: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarDigitador/${correo}`);
  }
  public eliminarIngeniero(correo: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarIngeniero/${correo}`);
  }
  public eliminarEmpresa(nombre: string): Observable<MensajeDTO> {
    // Imprime la URL antes de enviar la solicitud
    console.log('URL de eliminación de empresa:', `${this.authURL}/eliminarEmpresa/${nombre}`);
    // La información de la ciudad se pasa como parte de la URL
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarEmpresa/${nombre}`);
  }
  buscarEmpresas(nombre: string): Observable<EmpresasGetDTO[]> {
    const url = `${this.authURL}/buscarEmpresa/${nombre}`;
    return this.http.get<EmpresasGetDTO[]>(url);
  }
 
  buscarAdministrador(correo: string): Observable<AdministradorDTO[]> {
    const url = `${this.authURL}/buscarAdministrador/${correo}`;
    return this.http.get<AdministradorDTO[]>(url);
  }
  editarEmpresa(empresa: EmpresasGetDTO): Observable<any> {
    const url = `${this.authURL}/editarEmpresa`; // Reemplaza 'editarEmpresa' con la ruta correcta en tu backend
    return this.http.put(url, empresa);
  }
  editarIngeniero(ingeniero: IngenieroGetDTO): Observable<any> {
    const url = `${this.authURL}/editarIngeniero/${ingeniero.cedula}`; // Asegúrate de incluir la cédula en la URL
    return this.http.put(url, ingeniero);
  }
  public agregarSede(ciudad: string, direccion: string, telefono: string): Observable<MensajeDTO> {
    // Construir un objeto con los datos de la empresa
    const sedeData = {ciudad, direccion, telefono };

    // Realizar la solicitud POST enviando el objeto como el cuerpo de la solicitud
    return this.http.post<MensajeDTO>(`${this.authURL}/agregarSede`, sedeData);
  }

  public listarSedes(): Observable<SedesGetDTO[]> {
    return this.http.get<SedesGetDTO[]>(`${this.authURL}/listarSedes`);
  }
  public eliminarSedes(ciudad: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarSede/${ciudad}`);
  }
  buscarSede(ciudad: string): Observable<SedesGetDTO[]> {
    const url = `${this.authURL}/buscarSede/${ciudad}`;
    return this.http.get<SedesGetDTO[]>(url);
  }
  buscarIngeniero(nombre: string): Observable<IngenieroGetDTO[]> {
    const url = `${this.authURL}/buscarIngenieros/${nombre}`;
    return this.http.get<IngenieroGetDTO[]>(url);
  }
  buscarDigitador(nombre: string): Observable<DigitadorDTO[]> {
    const url = `${this.authURL}/buscarDigitador/${nombre}`;
    return this.http.get<DigitadorDTO[]>(url);
  }
  editarSede(sedesDto: SedesGetDTO): Observable<any> {
    const url = `${this.authURL}/editarSede`;
    return this.http.put(url, sedesDto);
}

public listarCilindros(): Observable<CilindroGetDto[]>{
  return this.http.get<CilindroGetDto[]>(`${this.authURL}/listarCilindros`);
}

public agregarCilindro(cilindroDto: RegistroCilindroDto): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/agregarCilindros`, cilindroDto);
}

public listaSeccion():Observable<SeccionDto>{
  return this.http.get<SeccionDto>(`${this.authURL}/listarSeccion`);
} 

}
