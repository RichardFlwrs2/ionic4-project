import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Ionic
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";



import { AppComponent } from "./app.component";
import { SessionInfoPage } from './shared/layout/session-info/session-info.page';
import { NuevaEntidadComponent } from './shared/components/nueva-entidad/nueva-entidad.component';
import { SessionInfoPageModule } from './shared/layout/session-info/session-info.module';
import { NuevaEntidadPageModule } from './shared/components/nueva-entidad/nueva-entidad.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [SessionInfoPage, NuevaEntidadComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SessionInfoPageModule,
    NuevaEntidadPageModule
  ],

  providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
