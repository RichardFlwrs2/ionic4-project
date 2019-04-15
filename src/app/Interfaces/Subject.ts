import { Empresa } from "./Empresa";
import { Survey } from "./SurveyAccess";
import { Entidad, EntityAdress } from "./Entidad";
import { Direccion } from "./Direccion";

export interface Subject {
  // ENTIDAD DATA
  tipoEntidad?: "USUARIO" | "EMPRESA" | "CONTACTO";
  idEntidad?: number;
  rol?: number | 1 | 2 | 3; // 1: Admin | 2: Medio | 3: Basico
  nombre?: string;
  picture?: string;
  idPicture?: number;
  emailList?: EntidadEmail[];
  telefonoList?: EntidadTelefono[];
  direccion?: string;
  direccionDTO?: EntityAdress;
  idUsuarioOwner?: number;
  rfc?: string;
  // USUARIO
  idUsuario?: number;
  username: string;
  // CONTACTO
  idContacto?: number;
  empresaDTO?: {
    idEmpresa?: number;
  };
  estatus?: EntidadStatus;
  campos?: EntidadCamposExtras[];
  idOwner?: number;
  ownerName?: string;
  // EMPRESA
  idEmpresa?: number;
}
export interface EntidadTelefono {
  telefono?: string;
  tipoTelefono?: "Fijo" | "Movil" | "Trabajo" | string;
  idTelefono?: number;
  idTipoTelefono?: number;
  action?: string;
}

export interface EntidadEmail {
  email?: string;
  tipoEmail?: "Trabajo" | "Personal" | string;
  idEmail?: number;
  idTipoEmail?: number;
  action?: string;
}

export interface EntidadStatus {
  idEstatus?: number;
  nombre: string;
  color: string;
}

export interface EntidadCamposExtras {
  idCampoExtra: number;
  idCampoType: number;
  type: string;
  label: string;
  text: string;
  value: any;
  direccion: Direccion;
  catalogo: any;
  catalogoAnswers: any[];
}

export interface SubjectBD {
  // General
  entidad: Entidad;
  // Ids
  idUsuario?: number;
  idContacto?: string;
  idEmpresa?: string;
  // Usuaio
  username?: string;
  password?: string;
  idTipoUsuario?: number;
  tipoUsuario?: {
    idTipoUsuario: number;
    nombre?: string;
  };
  Survey?: Survey[];
  // Contacto
  empresa?: Empresa;
  // En Catalogo
  isSelected?: boolean;
  nombre?: string;
  picture?: any;
}

export interface ExtraFields {
  telefono?: string | number;
  tipoTelefono?: number;
  email?: string;
  tipoEmail?: number;
}
