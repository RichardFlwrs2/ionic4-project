import { Empresa } from "./Empresa";
import { Entidad } from "./Entidad";

// INPUT
export interface Contacto {
  idEntidad: number;
  shared?: Shared[];
  estatus: Estatus;
  picture?: string;
  idContacto: number;
  telefono: string;
  nombre: string;
  isShared: boolean;

  empresaDTO?: {
    idEmpresa?: number;
  };

  // utils
  entidad?: Entidad;
  checked?: boolean;
}
export interface ContactoTab {
  idContacto: number;
  nombre: string;
}

// OUTPUT

interface Estatus {
  color: string;
  idEstatus: number;
}

interface Shared {
  tipo: string;
  idUsuario: number;
  nombre: string;
}
