import { Survey } from "../interfaces/SurveyAccess";
import { Entidad } from "../interfaces/Entidad";

export class User {
  // Properties
  public username: string;
  public password: string;
  public tipoUsuario?: {
    idTipoUsuario: number; // 1:Admin 2:Intermedio 3:Basico
  };
  public userRole?: {
    idRole: number;
    nombre: string;
  };
  public idUsuario?: number;
  public Survey?: Survey[];
  // ENTIDAD
  public idEntidad?: number;
  public entidad?: Entidad;
  public picture?: string;

  constructor(data: any) {
    //
    if (data) {
      const props = Object.keys(this);
      for (const i in props) {
        if (data[props[i]]) this[props[i]] = data[props[i]];
      }
    }
  }
}
