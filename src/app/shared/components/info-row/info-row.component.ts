import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UsuarioGpList } from "src/app/interfaces/Usuario";

@Component({
  selector: "app-info-row",
  templateUrl: "./info-row.component.html",
  styleUrls: ["./info-row.component.scss"]
})
export class InfoRowComponent implements OnInit {
  @Input() entity: any;
  @Input() iconLeft: string = "md-person";
  @Input() iconRight: string;
  @Input() iconRightColor: string;

  @Output() startIconEmmiter = new EventEmitter<any>();
  @Output() endIconEmmiter = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
