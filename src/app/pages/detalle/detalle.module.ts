import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetallePage } from './detalle.page';
import { SharedModule } from 'src/app/shared/shared.module';

// Providers
import { DetalleService } from './detalle.service';
import { InfoCardComponent } from './components/info-card/info-card.component';

// Components

const routes: Routes = [
  {
    path: '',
    component: DetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [DetalleService],
  declarations: [DetallePage, InfoCardComponent]
})
export class DetallePageModule {}
