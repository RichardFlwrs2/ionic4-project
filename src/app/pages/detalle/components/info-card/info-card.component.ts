import { Component, OnInit, OnDestroy } from "@angular/core";
import { DetalleService } from "../../detalle.service";
import { FormToolService } from "src/app/services/tools/form-tools.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IonToastService } from "src/app/services/messages/ion-toast.service";
import { Subscription } from "rxjs/Subscription";
import { Entity } from "src/app/models/Entity.model";
import { EntityAdress, EntityAdressClass } from "src/app/interfaces/Entidad";

@Component({
  selector: "app-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.scss"]
})
export class InfoCardComponent implements OnInit, OnDestroy {
  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - PROPERTIES
  // * -------------------------------------------------------------------------------------------------------------------- //

  // Subscriber
  detalleSubscription: Subscription;

  // Form utils
  editMode: boolean = false;
  isManualAddress: boolean = false;
  phoneTypes: any[] = [{ value: 1, option: "Fijo" }, { value: 2, option: "Movil" }, { value: 3, option: "Trabajo" }];
  mailTypes: any[] = [{ value: 1, option: "Trabajo" }, { value: 2, option: "Personal" }];
  imgOptions_open = false;
  emailList: FormArray;
  telefonoList: FormArray;

  public default: FormControl = new FormControl();
  public infoForm: FormGroup = new FormGroup({});

  // Entity Data
  Entity: Entity = new Entity(null);

  constructor(
    public _detalleS: DetalleService,
    public _fts: FormToolService,
    public _msgS: IonToastService,
    public _stS: StorageService,
    private fb: FormBuilder
  ) {}

  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - INIT FORM ENTITY
  // * -------------------------------------------------------------------------------------------------------------------- //
  ngOnInit() {
    this.detalleSubscription = this._detalleS.EntitySubject.subscribe(res => {
      this.Entity = this._detalleS.Entity;
      this.telefonoList = null;
      this.emailList = null;
      console.log(res);

      // Init Form
      switch (this.Entity.tipoEntidad) {
        case "USUARIO":
          // ------------------------------------------------------------------- //
          // -------------------------------| USUARIO

          this.infoForm = this.fb.group({
            username: [null, this._fts.validators("L_Num")],
            nombre: [null, this._fts.validators("onlyL")],
            emailList: this.fb.array([]),
            telefonoList: this.fb.array([])
          });

          this.Entity.emailList.forEach(e => this.addEmail());
          this.Entity.telefonoList.forEach(e => this.addPhone());

          //
          break;
        case "EMPRESA":
          // ------------------------------------------------------------------- //
          // -------------------------------| EMPESA
          this.infoForm = this.fb.group({
            nombre: [null, this._fts.validators("L_Num")],
            rfc: [null],
            calle: [null],
            ciudad: [null],
            codigopostal: [null],
            colonia: [null],
            estado: [null],
            latitud: [null],
            longitud: [null],
            nombreDireccion: [null],
            pais: [null]
          });

          //
          break;
        case "CONTACTO":
          // ------------------------------------------------------------------- //
          // -------------------------------| CONTACTO

          this.infoForm = this.fb.group({
            nombre: [null, this._fts.validators("onlyL")],
            emailList: this.fb.array([]),
            telefonoList: this.fb.array([])
          });

          this.Entity.emailList.forEach(e => this.addEmail());
          this.Entity.telefonoList.forEach(e => this.addPhone());

          //
          break;

        default:
          break;
      }

      this.infoForm.setValue(this.Entity.get_formBuild());
    });

    //
  }

  addEmail() {
    this.emailList = this.infoForm.get("emailList") as FormArray;
    this.emailList.push(
      this.fb.group({
        email: [null, this._fts.validators("email")],
        tipoEmail: [null],
        idEmail: [null],
        idTipoEmail: [1, Validators.required],
        action: ["add"]
      })
    );
  }

  addPhone() {
    this.telefonoList = this.infoForm.get("telefonoList") as FormArray;
    this.telefonoList.push(
      this.fb.group({
        telefono: [null, this._fts.validators("phone")],
        tipoTelefono: [null],
        idTelefono: [null],
        idTipoTelefono: [1, Validators.required],
        action: ["add"]
      })
    );
  }

  deletePhone(i: number) {
    const id = this.telefonoList.at(i).value.idTelefono;
    if (id) {
      const telefono = this.Entity.telefonoList.find(t => t.idTelefono === id);
      telefono.action = "delete";
      this.Entity.telefonoListToDelete.push(telefono);
    }
    this._fts.markTouched(this.infoForm);
    this.telefonoList.removeAt(i);
  }

  deleteEmail(i: number) {
    const id = this.emailList.at(i).value.idEmail;
    if (id) {
      const email = this.Entity.emailList.find(e => e.idEmail === id);
      email.action = "delete";
      this.Entity.emailListToDelete.push(email);
    }
    this._fts.markTouched(this.infoForm);
    this.emailList.removeAt(i);
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - SEND FORM
  // * -------------------------------------------------------------------------------------------------------------------- //
  // ? -------------------------------->| Toogle Edit Mode -->
  toggleEdit(sendForm: boolean) {
    if (!sendForm) {
      this.editMode = false;
      this._detalleS.getEntityData();
      return;
    }

    if (this.infoForm.dirty) {
      if (this.infoForm.invalid) {
        this._fts.markTouched(this.infoForm);
        return;
      }

      if (confirm("Estas seguro de guardar los cambios")) this.sendForm();
      else this._detalleS.getEntityData();
      this.editMode = false;
    } else this.editMode = false;
  }

  sendForm() {
    this.Entity.setNewData(this.infoForm.value);

    // Send request
    this._detalleS.editEntity().subscribe(res => {
      this._detalleS.getEntityData();
    });
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - CHANGE IMAGE
  // * -------------------------------------------------------------------------------------------------------------------- //
  imgOptionsToggle() {
    this.imgOptions_open = !this.imgOptions_open;
  }

  onFileSelected(event: any) {
    this.imgOptionsToggle();
    const fileSelected = <File>event.target.files[0];
    const file = fileSelected;
    const typeFile = file.type.split("/");

    if (!file) {
      console.error("No hay archivo");
      return;
    }

    if (typeFile[0] !== "image") {
      console.error("No es valido ese archivo");
      return;
    }

    this._detalleS.uploadImage(this.Entity.idEntidad.toString(), file).subscribe(res => {
      this._detalleS.getEntityData();
      this.editMode = false;
    });
  }

  borrarImagen() {
    this._detalleS.borrarImagen(this.Entity.idEntidad.toString()).subscribe(res => {
      this.Entity.picture = null;
      this.Entity.picUrl = null;
      this.editMode = false;
      this.imgOptionsToggle();
    });
  }

  // * -------------------------------------------------------------------------------------------------------------------- //
  // * - U T I L I T I E S
  // * -------------------------------------------------------------------------------------------------------------------- //

  // ? -------|                          Cambiar Status
  fixEstatus() {
    this._detalleS.changeStatus().subscribe(
      res => {
        this._detalleS.getEntityData();
      },
      err => this._detalleS.getEntityData()
    );
  }

  // ? -------|                          Abrir Formularios Compartidos ?
  showFormAdd() {
    console.log("????");
    // this._menuC.toggleOffside(this._menuC.offside_options[2]);
  }

  // ? -------|                          Abrir para compartir
  sharedEntity() {
    console.log("????");
    // this._menuC.toggleOffside(this._menuC.offside_options[5]);
    this._detalleS.getCustomEntities(this.Entity.idEntidad);
  }

  selectValue(address: EntityAdress) {
    if (address) {
      this.Entity.direccionDTO = address;
      this.Entity.direccion = address.nombre;
    }
    this._fts.markTouched(this.infoForm);
  }

  // ------------------------------------------------------------------------------------ */
  // * -------|                          GOOGLE PLACES | DIRECCION

  direccionType(isManual) {
    if (isManual) {
      if (this.Entity.direccionDTO ? this.Entity.direccionDTO.latitud && this.Entity.direccionDTO.longitud : false) {
        this.Entity.direccionDTO.latitud = null;
        this.Entity.direccionDTO.longitud = null;
      }
    } else {
      this.Entity.direccion = "";
      this.Entity.direccionDTO = new EntityAdressClass();
    }
  }

  goToAddressInMaps(empresa, isCampoExtra) {
    const direccion = isCampoExtra ? empresa.direccion : empresa.direccionDTO;
    if (!direccion) return;

    if (direccion.latitud && direccion.longitud) {
      const URL = `https://www.google.com/maps/search/?api=1&query=${direccion.latitud},${direccion.longitud}`;
      window.open(URL, "_blank");
    }
  }

  ngOnDestroy() {
    this.detalleSubscription.unsubscribe();
  }
}
