import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageComponent } from './tabs.page.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPageComponent,
    children: [
      {
        path: 'tareas',
        children: [
          {
            path: '',
            loadChildren: './tareas/tareas.module#TareasPageModule'
          }
        ]
      },
      {
        path: 'apps',
        children: [
          {
            path: '',
            loadChildren: './apps/apps.module#AppsPageModule'
          }
        ]
      },
      {
        path: 'networking',
        children: [
          {
            path: '',
            loadChildren: './networking/networking.module#NetworkingPageModule'
          }
        ]
      },
      {
        path: 'team',
        children: [
          {
            path: '',
            loadChildren: './team/team.module#TeamPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tareas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tareas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
