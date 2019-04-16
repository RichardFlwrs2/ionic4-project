import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./layout/header/header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { SessionInfoPageModule } from "./layout/session-info/session-info.module";

// Components
import { SessionInfoPage } from "./layout/session-info/session-info.page";
import { SimpleInputComponent } from "./components/simple-input/simple-input.component";
import { InfoRowComponent } from "./components/info-row/info-row.component";
import { ImgPipe } from "./pipes/img.pipe";

@NgModule({
  declarations: [HeaderComponent, SimpleInputComponent, InfoRowComponent, ImgPipe],
  exports: [
    // Modulos
    NgxMaskModule,
    ReactiveFormsModule,
    // Components
    HeaderComponent,
    SimpleInputComponent,
    InfoRowComponent,
    // Pipes
    ImgPipe
  ],
  entryComponents: [SessionInfoPage],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(), SessionInfoPageModule]
})
export class SharedModule {}
