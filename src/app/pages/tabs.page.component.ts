import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.component.html',
  styleUrls: ['tabs.page.component.scss']
})
export class TabsPageComponent {
  tabPages: TabPage[] = [
    {
      url: 'tareas',
      icon: 'home',
      title: 'Home'
    },
    {
      url: 'apps',
      icon: 'apps',
      title: 'Apps'
    },
    {
      url: 'networking',
      icon: 'people',
      title: 'Networking'
    },
    {
      url: 'team',
      icon: 'trophy',
      title: 'Team'
    }
  ];
}

interface TabPage {
  url: string;
  icon: string;
  title: string;
}
