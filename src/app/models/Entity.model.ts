import { EntidadEmail, EntidadTelefono, EntidadStatus, EntidadCamposExtras } from "../interfaces/Subject";
import { EntityAdress } from "../interfaces/Entidad";
import { environment } from "../../environments/environment";
import { Credential } from "../interfaces/LogginForm";
import { Grupo } from "../interfaces/UserGroups";
import { Survey } from "../interfaces/SurveyAccess";
import { ContactoTab } from "../interfaces/Contacto";
import { FileDb } from "../interfaces/File";

export class Entity {
  // * ----------------------------------------------------------------------------------------------------------------- //
  // * - PROPERTIES
  // * ----------------------------------------------------------------------------------------------------------------- //
  private d: boolean = !environment.production;
  private session: Credential = JSON.parse(localStorage.getItem("session-livestat"));

  public rol?: number | 1 | 2 | 3 = null; // 1: Admin | 2: Medio | 3: Basico
  public tipoEntidad?: "USUARIO" | "EMPRESA" | "CONTACTO" | string | any = null;
  public idTipoEntidad?: number = null;
  public picture?: string = null;
  public picUrl?: string = null;
  public idEntidad?: number = null;
  public nombre?: string = null;
  public idPicture?: number = null;
  public idUsuarioOwner?: number = null;
  public idOwner?: number = null;
  public ownerName?: string = null;
  public emailList?: EntidadEmail[] = [];
  public telefonoList?: EntidadTelefono[] = [];

  public direccion?: string = null;
  public direccionDTO?: EntityAdress = null;
  public empresaDTO?: {
    idEmpresa?: number;
  } = { idEmpresa: null };
  public rfc?: string = null;

  // id's
  public idUsuario?: number = null;
  public idContacto?: number = null;
  public idEmpresa?: number = null;

  // ? -----| USER |---->
  public username: string = null;

  // ? -----| CONTACTO |---->
  public estatus?: EntidadStatus = null;

  // ? -----| EMPRESA |---->
  public campos?: EntidadCamposExtras[] = [];

  // Temporary
  public emailListToDelete: EntidadEmail[] = [];
  public telefonoListToDelete: EntidadTelefono[] = [];
  public grupos: Grupo[] = [];
  public surveys: Survey[] = [];
  public contactos: ContactoTab[] = [];
  public adjuntos: FileDb[] = [];
  public nombreDireccion: string;

  // * ----------------------------------------------------------------------------------------------------------------- //
  // * - CONSTRUCTOR
  // * ----------------------------------------------------------------------------------------------------------------- //
  constructor(data: any) {
    //
    if (!data) return;

    const props = Object.keys(this);
    for (const i in props) {
      if (data[props[i]]) {
        this[props[i]] = data[props[i]];
      }
    }

    //
  }

  // * ----------------------------------------------------------------------------------------------------------------- //
  // * - GETS
  // * ----------------------------------------------------------------------------------------------------------------- //
  get_formBuild() {
    // common properties
    const _FORM: any = {
      nombre: this.nombre
    };

    switch (this.tipoEntidad) {
      case "USUARIO":
        //
        _FORM.username = this.username;
        _FORM.telefonoList = this.telefonoList;
        _FORM.emailList = this.emailList;
        // _FORM.grupos = null;
        //
        break;
      case "EMPRESA":
        //
        _FORM.rfc = this.rfc;
        _FORM.calle = this.direccionDTO.calle;
        _FORM.ciudad = this.direccionDTO.ciudad;
        _FORM.codigopostal = this.direccionDTO.codigopostal;
        _FORM.colonia = this.direccionDTO.colonia;
        _FORM.estado = this.direccionDTO.estado;
        _FORM.latitud = this.direccionDTO.latitud;
        _FORM.longitud = this.direccionDTO.longitud;
        _FORM.nombreDireccion = this.direccionDTO.nombre;
        _FORM.pais = this.direccionDTO.pais;
        //
        break;
      case "CONTACTO":
        //
        _FORM.telefonoList = this.telefonoList;
        _FORM.emailList = this.emailList;
        //
        break;

      default:
        break;
    }

    // return _FORM;
    return _FORM;
  }

  get_httpBuild() {
    switch (this.tipoEntidad) {
      case "USUARIO":
        return {
          emailList: this.emailList,
          idEntidad: this.idEntidad,
          idOwner: this.idOwner,
          idTipoEntidad: this.idTipoEntidad,
          idUsuario: this.idUsuario,
          nombre: this.nombre,
          picture: this.picture,
          rol: this.rol,
          telefonoList: this.telefonoList,
          tipoEntidad: this.tipoEntidad,
          username: this.username
        };

      case "CONTACTO":
        return {
          campos: this.campos,
          emailList: this.emailList,
          empresaDTO: this.empresaDTO,
          estatus: this.estatus,
          idContacto: this.idContacto,
          idEntidad: this.idEntidad,
          idOwner: this.idOwner,
          idTipoEntidad: this.idTipoEntidad,
          nombre: this.nombre,
          ownerName: this.ownerName,
          picture: this.picture,
          telefonoList: this.telefonoList,
          tipoEntidad: this.tipoEntidad
        };

      case "EMPRESA":
        return {
          direccion: this.direccion,
          direccionDTO: this.direccionDTO,
          emailList: this.emailList,
          idEmpresa: this.idEmpresa,
          idEntidad: this.idEntidad,
          idOwner: this.idOwner,
          idTipoEntidad: this.idTipoEntidad,
          nombre: this.nombre,
          ownerName: this.ownerName,
          picture: this.picture,
          rfc: this.rfc,
          telefonoList: this.telefonoList,
          tipoEntidad: this.tipoEntidad
        };

      default:
        break;
    }
  }
  // * ----------------------------------------------------------------------------------------------------------------- //
  // * - SETS
  // * ----------------------------------------------------------------------------------------------------------------- //

  setNewData(data) {
    const props = Object.keys(this);
    for (const i in props) {
      if (data[props[i]]) {
        this[props[i]] = data[props[i]];
      }
    }

    // to add
    this.emailList.forEach(email => (email.tipoEmail = this.getTipoEmailById(email.idTipoEmail)));
    this.telefonoList.forEach(phone => (phone.tipoTelefono = this.getTipoTelefonoById(phone.idTipoTelefono)));

    // to delete
    this.telefonoListToDelete.forEach(phone => this.telefonoList.push(phone));
    this.emailListToDelete.forEach(email => this.emailList.push(email));

    // Direccion nombre
    if (this.tipoEntidad === "EMPRESA") this.direccionDTO.nombre = this.nombreDireccion;
  }

  // * ----------------------------------------------------------------------------------------------------------------- //
  // * - UTILITIES
  // * ----------------------------------------------------------------------------------------------------------------- //
  getTipoEmailById(id: number): string {
    let tipoEmail: string;

    if (id === 1) tipoEmail = "Trabajo";
    if (id === 2) tipoEmail = "Personal";

    return tipoEmail;
  }

  getTipoTelefonoById(id: number): string {
    let tipoTelefono: string;

    if (id === 1) tipoTelefono = "Fijo";
    if (id === 2) tipoTelefono = "Movil";
    if (id === 3) tipoTelefono = "Trabajo";

    return tipoTelefono;
  }
}
