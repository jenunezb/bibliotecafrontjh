import { ObraCr } from "./ObraCr";
import { ObrasDto } from "./obras-get-dto";

export class AsignarObrasRequestDTO{
    codigoUsuario: number = 0;
    listaObras: ObraCr[] = [];
}