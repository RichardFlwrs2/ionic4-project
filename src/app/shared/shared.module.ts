import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./layout/header/header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SimpleInputComponent } from "./components/simple-input/simple-input.component";
import { NgxMaskModule } from "ngx-mask";
import { SessionInfoPage } from "./layout/session-info/session-info.page";
import { SessionInfoPageModule } from "./layout/session-info/session-info.module";

@NgModule({
  declarations: [HeaderComponent, SimpleInputComponent],
  exports: [
    // Modulos
    NgxMaskModule,
    ReactiveFormsModule,
    // Components
    HeaderComponent,
    SimpleInputComponent
  ],
  entryComponents: [SessionInfoPage],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(), SessionInfoPageModule]
})
export class SharedModule {}
