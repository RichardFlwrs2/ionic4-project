export interface Entidad {
  tipoEntidad: {
    idTipoEntidad: number | 1 | 2 | 3; // 1:USUARIO | 2:EMPRESA | 3:CONTACTO
    nombre?: string;
  };
  idEntidad?: number;
  nombre?: string;
  email?: EntEmail[];
  telefono?: EntTelefono[];
  idDireccion?: number; // * Googgle Directions API
  direccion?: EntityAdress;
  picture?: EntPicture;
  // idEstatusEntidad?: number;
  estatus?: EntEstatus;
  idUsuarioOwner?: number | string;
  active?: boolean;
  campos?: {
    nombre?: string;
    valor?: string;
  }[];
}

export interface EntEstatus {
  idEstatus?: number;
  nombre: string;
  color: string;
}

export interface EntPicture {
  idPicture?: number;
  fileName?: string;
  contentType?: string;
  base64?: string;
}

export interface EntTelefono {
  tipoTelefono?: {
    idTipoTelefono: number; // 1: Fijo | 2: Movil | 3: Trabajo
    nombre: string;
  };
  numero: number | string;
  idTelefono?: number;
}

export interface EntEmail {
  tipoEmail: {
    idTipoEmail: number; // 1: Trabajo | 2: Personal
    nombre?: string;
  };
  nombre: string;
  idEmail?: number;
}

export interface EntityAdress {
  calle: string;
  ciudad: string;
  codigopostal: string;
  colonia: string;
  estado: string;
  idDireccion?: number;
  latitud?: number;
  longitud?: number;
  nombre: string;
  pais: string;
}

export class EntityAdressClass implements EntityAdress {
  nombre = null;
  latitud = null;
  longitud = null;
  calle = null;
  colonia = null;
  codigopostal = null;
  ciudad = null;
  estado = null;
  pais = null;
  constructor() {}
}
