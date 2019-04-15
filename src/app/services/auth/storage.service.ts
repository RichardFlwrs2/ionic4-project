import { Injectable } from "@angular/core";
import { Credential } from "../api/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localStorageService;
  private currentSession = null;
  private authToken = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.authToken = this.loadAuthToken();
  }

  loadSessionData(): Credential {
    const sessionStr = this.localStorageService.getItem("session-livestat");
    return sessionStr ? JSON.parse(sessionStr) : null;
  }

  loadAuthToken() {
    const authToken = this.localStorageService.getItem("authToken");
    return authToken ? authToken : null;
  }

  public isAuthenticated(): boolean {
    return this.loadSessionData() != null && this.loadAuthToken() != null ? true : false;
  }
}
