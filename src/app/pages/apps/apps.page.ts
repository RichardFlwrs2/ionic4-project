import { Component, OnInit } from "@angular/core";
import { SurveyService } from "src/app/services/api/surveys.service";
import { Survey } from "src/app/Interfaces/SurveyAccess";
import { StorageService } from "src/app/services/auth/storage.service";

@Component({
  selector: "app-apps",
  templateUrl: "./apps.page.html",
  styleUrls: ["./apps.page.scss"]
})
export class AppsPage implements OnInit {
  surveys: Survey[] = [];

  constructor(private _surveyS: SurveyService, private _sts: StorageService) {
    this._surveyS.getSurveyByOwner(this._sts.session.idUsuario).subscribe((res: any) => {
      console.log(res);
      this.surveys = res;
    });
  }

  ngOnInit() {}
}
