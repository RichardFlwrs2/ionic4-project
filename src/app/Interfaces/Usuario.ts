import { Survey } from "./SurveyAccess";
import { Entidad } from "./Entidad";
export interface Usuario {
  // Al crear el usuario
  username: string;
  password: string;
  tipoUsuario?: {
    idTipoUsuario: number; // 1:Admin 2:Intermedio 3:Basico
  };
  userRole?: {
    idRole: number;
    nombre: string;
  };
  // Despues
  idUsuario?: number;
  Survey?: Survey[];
  // ENTIDAD
  idEntidad?: number;
  entidad?: Entidad;
  picture?: string;
}

export interface UserForm {
  username: string;
  nombre: string;
  survey: number;
  grupos: number;
  estado: number;
  ciudad: number;
  telefono: {
    numero: number;
    id_telefono?: number;
  }[];
  email: string;
  formPasswords: {
    password: string;
    confirmPassword: string;
  };
}

export interface UsuarioGpList {
  nombre: string;
  idUsuario: number;
  isSelected?: boolean;
  picture?: string;
}
