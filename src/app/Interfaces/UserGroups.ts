import { UsuarioGpList } from "./Usuario";

export interface Grupo {
  // Cuando se crea
  nombre: string;
  ids: number[];
  idUsuarioOwner?: number;
  idUserOwner?: number;
  // Ya con Datos
  picture?: string;
  idGrupo?: number;
  usuarios?: UsuarioGpList[];
}
