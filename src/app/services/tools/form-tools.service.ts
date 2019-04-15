import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, Validators, FormGroup, FormBuilder, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class FormToolService {
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // * - Properties
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  public validation_messages = {
    //

    requerido: [{ type: "required", message: "Este campo es requerido" }],
    invalido: [
      { type: "required", message: "Este campo es requerido" },
      { type: "email", message: "Por favor ingrese un correo válido" },
      { type: "pattern", message: "Ingresa un dato valido" },
      { type: "minlength", message: "Dato ingresado invalido" },
      { type: "maxlength", message: "Dato ingresado muy largo" },
      { type: "sonIguales", message: "Las contraseñas no coinciden" }
    ]

    //
  };

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // * - Constructor - Init
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  constructor(private fb: FormBuilder) {}

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // ? -  Funcion para validar errores en los campos de los formularios
  // * ------------------------------------------------------------------------------------------------------------------------------- //

  /**
   * Retorna la clase css: 'has_error' si hay error para [ngClass]
   * @param  campo     Ej: FormExample.get('campo_name')
   * @param  isFromIf  Si el validador se usara en un *ngIf
   */
  public classValidators(campo: AbstractControl, isFromIf = false) {
    //

    if (!isFromIf)
      return {
        //
        "is-invalid bg-main-color": campo.invalid && (campo.dirty || campo.touched),
        "is-valid": campo.valid
        //
      };
    else return campo.invalid && (campo.dirty || campo.touched);

    //
  }

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // ? - Funcion para agregar validadores a los campos de los formularios
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  validators(type: "phone" | "email" | "onlyL" | "L_Num" | "RFC", required: boolean = true): ValidatorFn[] {
    //
    const VALIDATORS: ValidatorFn[] = required ? [Validators.required] : [];

    // Starting the switch
    switch (type) {
      //

      // ? - - - - - - - - -| Telefono
      case "phone":
        VALIDATORS.push(Validators.maxLength(12), Validators.minLength(8), Validators.pattern("[0-9]*"));

        return VALIDATORS;

      // ? - - - - - - - - -| Email
      case "email":
        VALIDATORS.push(Validators.pattern("^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"), Validators.maxLength(100));

        return VALIDATORS;

      // ? - - - - - - - - -| Solo letras (a-Z)
      case "onlyL":
        VALIDATORS.push(Validators.pattern("[a-zA-ZÀ-ž ]+"), Validators.maxLength(150));

        return VALIDATORS;

      // ? - - - - - - - - -| letras y numeros (a-z, 0-9)
      case "L_Num":
        VALIDATORS.push(Validators.pattern("[a-zA-ZÀ-ž0-9_ ]+"), Validators.maxLength(150));

        return VALIDATORS;

      // ? - - - - - - - - -| RFC
      case "RFC":
        VALIDATORS.push(Validators.required, Validators.maxLength(12), Validators.pattern("^[0-9]*$"));

        return VALIDATORS;

      default:
        throw new Error("No se ha seleccionado un tipo de validador");
    }

    //
  }

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // ? - Marca los campos como touched
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  markTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      control.markAsDirty();

      if (control.controls) {
        this.markTouched(control);
      }
    });
  }

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // ? - Crear Form para Contraseñas
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  newFG_password(): FormGroup {
    //

    // * FORMULARIO MATCH CONTRASEÑAS
    return this.fb.group(
      {
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]]
      },
      { validator: this.MatchPassword }
    );

    //
  }

  // * ------------------------------------------------------------------------------------------------------------------------------- //
  // ? - Validador de contraseñas
  // * ------------------------------------------------------------------------------------------------------------------------------- //
  sonIguales(campo1: string, campo2: string) {
    //

    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };

    //
  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get("password").value; // to get value in input tag
    const confirmPassword = AC.get("confirmPassword").value; // to get value in input tag
    if (password !== confirmPassword) AC.get("confirmPassword").setErrors({ MatchPassword: true });
    else return null;
  }
}
