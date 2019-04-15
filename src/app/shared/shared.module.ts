import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./layout/header/header.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class SharedModule {}
