import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Entity } from "../../models/Entity.model";
import { Credential } from "../../interfaces/LogginForm";
import { UsuariosService } from "src/app/services/api/users.service";
import { ContactsService } from "src/app/services/api/contacts.service";
import { CompaniesService } from "src/app/services/api/companies.service";
import { EntidadesService } from "src/app/services/api/entities.service";
import { SurveyService } from "src/app/services/api/surveys.service";
import { StatesService } from "src/app/services/api/states.service";
import { FileService } from "src/app/services/api/file.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { ImgFilterService } from "src/app/services/tools/img-filter.service";

@Injectable()
export class DetalleService {
  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - PROPERTIES
  // * -------------------------------------------------------------------------------------------------------------------- //

  public states: any[] = [];
  public typeEntity: string;
  public idEntity: string;
  public Entity: Entity;

  // Observer for Entity
  public EntitySubject = new Subject<Entity>();

  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - INIT
  // * -------------------------------------------------------------------------------------------------------------------- //
  constructor(
    private router: Router,
    private _userS: UsuariosService,
    private _contactoS: ContactsService,
    private _empresaS: CompaniesService,
    private _es: EntidadesService,
    private _ss: SurveyService,
    private _statesS: StatesService,
    private _fs: FileService,
    public _stS: StorageService,
    private _img: ImgFilterService
  ) {}
  // private _direccionS: DireccionesService,
  // private _mapsS: MapsService

  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? - GET DATA BY TYPE - setteo personalizable
  // * -------------------------------------------------------------------------------------------------------------------- //
  private getEntityDataByType() {
    const id = this.idEntity;
    switch (this.typeEntity) {
      case "usuario":
        // * ---------------| U S U A R I O
        return this._userS.getUserById(id).pipe(
          map((res: any) => {
            // Actualiza la imagen del localStorage
            if (res.idUsuario === this._stS.session.idUsuario) this._stS.setPictureSession(res.picture);

            // get Grupo
            this._userS.getGruposByUsuario(res.idUsuario.toString()).subscribe((_res: any) => {
              this.Entity.grupos = _res;
            });

            // get Surveys
            this._ss.getAssignedSurveysByUser(res.idUsuario.toString()).subscribe((res: any) => {
              this.Entity.surveys = res;
            });

            return res;
          })
        );

      case "contacto":
        // * ---------------| C O N T A C T O

        return this._contactoS.getContactoById(id).pipe(
          map((res: any) => {
            if (!res.empresaDTO) res.empresaDTO = { idEmpresa: null };
            if (!res.estatus) res.estatus = { idEstatus: 1 };
            return res;
          })
        );

      case "empresa":
        // * ---------------| E M P R E S A

        return this._empresaS.getEmpresaById(id).pipe(
          map((res: any) => {
            this._empresaS.getContactosByEmpresa(res.idEmpresa.toString()).subscribe((res: any) => {
              this.Entity.contactos = res;
            });

            // Get Direccion
            // if (res.direccionDTO) {
            //   if (res.direccionDTO.latitud && res.direccionDTO.longitud && !res.direccionDTO.nombre) {
            //     this._mapsS.getDataByLatLng(res.direccionDTO.latitud, res.direccionDTO.longitud).then(data => {
            //       this.Entity.direccionDTO = this._direccionS.setAddress(data[0]);
            //       this.Entity.direccion = this.Entity.direccionDTO.nombre;
            //     });
            //   }
            // }

            return res;
          })
        );

      default:
        this.router.navigate(["/calendario"]);
        break;
    }
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? - GET DATA - setteo general
  // * -------------------------------------------------------------------------------------------------------------------- //
  public getEntityData() {
    this.getEntityDataByType().subscribe(res => {
      this.Entity = new Entity(res);
      if (this.Entity.picture) this.Entity.picUrl = this._img.getUrlPic(this.Entity.picture, this.Entity.tipoEntidad.toLowerCase());

      // get Adjuntos
      this._fs.getArchivoAdjuntos(res.idEntidad.toString()).subscribe((res: any) => {
        this.Entity.adjuntos = res;
      });

      console.log(this.Entity);

      // Avisa a los demas componentes que ya llegó la data
      this.EntitySubject.next(res);
    });
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? - UPDATE DATA ENTITY
  // * -------------------------------------------------------------------------------------------------------------------- //
  public editEntity() {
    const entity = this.Entity.get_httpBuild();

    switch (this.typeEntity) {
      case "usuario":
        // * ---------------| U S U A R I O
        return this._userS.updateUser(entity).pipe(
          map((res: any) => {
            return res;
          })
        );

      case "contacto":
        // * ---------------| C O N T A C T O

        return this._contactoS.updateContacto(entity).pipe(
          map((res: any) => {
            return res;
          })
        );

      case "empresa":
        // * ---------------| E M P R E S A

        return this._empresaS.updateCompanie(entity).pipe(
          map((res: any) => {
            return res;
          })
        );

      default:
        this.router.navigate(["/calendario"]);
        break;
    }
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? - UPLOAD FILE PICTURE
  // * -------------------------------------------------------------------------------------------------------------------- //
  public uploadImage(idEnitdad, file) {
    return this._fs.uploadImage(idEnitdad, file, "Entidad");
  }

  public borrarImagen(idEnitdad) {
    return this._fs.deleteImageByEntity(idEnitdad);
  }

  public getStatusByIdOwner() {
    this._statesS.getStatusByIdOwner(this._stS.session.idOwner.toString()).subscribe((rest: any) => {
      this.states = rest;
    });
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? - GET CUSTOM ENTITIES
  // * -------------------------------------------------------------------------------------------------------------------- //
  // obtiene los usuarios y grupos con los que esta compartida esta entidad
  public getCustomEntities(idEntidad) {
    this._es.getCustomEntities(idEntidad, this._stS.session.idUsuario);
  }

  public changeStatus() {
    return this._statesS.fixEstatus(this.Entity.idContacto.toString(), this.Entity.estatus.idEstatus.toString());
  }
}
