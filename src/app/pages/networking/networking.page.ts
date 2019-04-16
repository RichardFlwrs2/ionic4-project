import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment } from "@ionic/angular";
import { ContactsService } from "src/app/services/api/contacts.service";
import { CompaniesService } from "src/app/services/api/companies.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { Credential } from "src/app/services/api/login.service";

@Component({
  selector: "app-networking",
  templateUrl: "./networking.page.html",
  styleUrls: ["./networking.page.scss"]
})
export class NetworkingPage implements OnInit {
  // Session
  session: Credential = this._sts.loadSessionData();

  companies: any[] = [];
  contacts: any[] = [];

  @ViewChild(IonSegment) segment: IonSegment;

  constructor(private _sts: StorageService, private _contactS: ContactsService, private _companieS: CompaniesService) {}

  ngOnInit() {
    this.segment.value = "contacts";

    this.getCompanies();
    this.getContacts();
  }

  getCompanies() {
    this._companieS.getEmpresasByOwner(this.session.idUsuario).subscribe(res => {
      console.log(res);
      this.companies = res;
    });
  }

  getContacts() {
    this._contactS.getContactosByOwner(this.session.idUsuario).subscribe(res => {
      console.log(res);
      this.contacts = res;
    });
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    console.log(value);
  }
}
