import { Component, Input, forwardRef, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { FormToolService } from "src/app/services/tools/form-tools.service";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => SimpleInputComponent),
  multi: true
};

@Component({
  selector: "simple-input",
  templateUrl: "./simple-input.component.html",
  styleUrls: ["./simple-input.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SimpleInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  // ---------------------------------------------------------------------------------------------- //
  // - PROPERTIES
  // ---------------------------------------------------------------------------------------------- //

  // GENERAL
  @Input() wrapperStyles: string[] = [""];
  @Input() data: string = "default data";
  @Input() isNew: boolean = false;
  @Input() editMode: boolean = false;

  // INPUT
  @Input() placeholder = "Input";
  @Input() campo: FormControl = new FormControl();
  @Input() label: string;
  @Input() type: string = "text";
  @Input() dataMask: string;

  // SELECT
  @Input() withSelect: boolean = false;
  @Input() selectData: any[] = [{ option: "test 1", value: 1 }, { option: "test 2", value: 2 }];
  @Input() selectValue;
  @Input() selectCampo: FormControl = new FormControl();

  @ViewChild("input") inputRef: ElementRef;

  private innerValue: any = "";
  public CSS_wrapper: any;

  // ---------------------------------------------------------------------------------------------- //
  // - CONSTRUCTOR - INIT
  // ---------------------------------------------------------------------------------------------- //
  constructor(public _fts: FormToolService) {}

  ngOnInit() {
    const cssStyles: string = this.wrapperStyles.map(style => style.toString()).join(" ");
    this.CSS_wrapper = {
      [cssStyles]: true
    };
  }

  setValue() {
    this.selectCampo.patchValue(this.selectValue);
  }

  ngAfterViewInit() {
    // You should see the actual form control properties being passed in
    // console.log("control", this.campo);
  }

  // ---------------------------------------------------------------------------------------------- //
  // - UTILITIES - PASSIVE FUNCTION
  // ---------------------------------------------------------------------------------------------- //

  getError() {
    const err = Object.keys(this.campo.errors);
    const errMsge = this._fts.validation_messages.invalido.find(e => e.type === err[0]);
    return errMsge.message;
  }

  // ? Funciones para corregir unos errores con ' ControlValueAccessor '
  // get accessor
  get value(): any {
    return this.innerValue;
  }
  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  // propagate changes into the custom form control
  propagateChange = (_: any) => {};
  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) {}
}
