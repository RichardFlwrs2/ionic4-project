import { Survey } from "../interfaces/SurveyAccess";
import { Entidad } from "../interfaces/Entidad";

export class User {
  // Properties
  public username: string = null;
  public password: string = null;
  public tipoUsuario = { idTipoUsuario: 3 }; // 1:Admin 2:Intermedio 3:Basico
  public userRole = {
    idRole: 3,
    nombre: "Basico"
  };
  public idUsuario?: number = null;
  public Survey?: Survey[] = [];
  // ENTIDAD
  public idEntidad?: number = null;
  public entidad?: Entidad = null;
  public picture?: string = null;

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
