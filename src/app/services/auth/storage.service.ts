import { Injectable } from "@angular/core";
import { Credential } from "../api/login.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localStorageService;
  public session = null;
  private authToken = null;

  constructor(private router: Router, private storage: Storage) {
    this.localStorageService = localStorage;
    this.loadSessionData();
    this.authToken = this.loadAuthToken();
  }

  async loadSessionData() {
    const res = await this.storage.get("session-livestat");
    this.session = res;
  }

  loadAuthToken() {
    const authToken = this.localStorageService.getItem("authToken");

    this.storage.get("authToken").then(token => {
      // console.log(token);
    });

    return authToken ? authToken : null;
  }

  setCurrentSession(session): void {
    this.session = session;
    this.storage.set("session-livestat", session);
    this.localStorageService.setItem("session-livestat", JSON.stringify(session));
  }
  setAuthToken(token): void {
    this.authToken = token;
    this.storage.set("authToken", token);
    this.localStorageService.setItem("authToken", token);
  }

  public isAuthenticated(): boolean {
    return this.session != null && this.loadAuthToken() != null ? true : false;
  }

  removeCurrentSession(): void {
    this.storage.remove("session-livestat");
    this.localStorageService.removeItem("session-livestat");
    this.session = null;
  }

  removeAuthToken(): void {
    this.storage.remove("authToken");
    this.localStorageService.removeItem("authToken");
    this.authToken = null;
  }
}
