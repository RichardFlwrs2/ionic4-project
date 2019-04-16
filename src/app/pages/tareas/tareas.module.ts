import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TareasPage } from './tareas.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TareasService } from './tareas.service';
import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
  {
    path: '',
    component: TareasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    FullCalendarModule
  ],
  providers: [TareasService],
  declarations: [TareasPage]
})
export class TareasPageModule {}
