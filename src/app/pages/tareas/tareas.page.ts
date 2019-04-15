import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/auth/storage.service';
import { TareasService } from './tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor( private test: StorageService, private testt: TareasService ) { }

  ngOnInit() {

    console.log( this.test.isAuthenticated() );

  }

}
