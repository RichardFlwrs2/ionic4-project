import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPageComponent } from "./tabs.page.component";
import { AuthGuard } from "../services/guards/auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPageComponent,
    children: [
      {
        path: "tareas",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            loadChildren: "./tareas/tareas.module#TareasPageModule"
          }
        ]
      },
      {
        path: "apps",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            loadChildren: "./apps/apps.module#AppsPageModule"
          }
        ]
      },
      {
        path: "networking",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            loadChildren: "./networking/networking.module#NetworkingPageModule"
          }
        ]
      },
      {
        path: "team",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            loadChildren: "./team/team.module#TeamPageModule"
          }
        ]
      },
      {
        path: "detalle/:tipo/:id",
        children: [
          {
            path: "",
            loadChildren: "./detalle/detalle.module#DetallePageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/tareas",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/tareas",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
