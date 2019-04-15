import { Entidad, EntityAdress } from "./Entidad";

export interface Empresa {
  idEmpresa?: string;
  picture?: string;
  // ENTIDAD
  nombre?: string;
  idEntidad?: number;
  entidad?: Entidad;
  telefono?: string;
  direccion?: string;
  direccionDTO?: EntityAdress;
}
// OUTPUT
