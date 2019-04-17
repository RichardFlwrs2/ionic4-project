import { Injectable } from "@angular/core";
import { Credential } from "../api/login.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localStorageService;
  public session: Credential = null;
  public token: string = null;

  constructor(private router: Router, private storage: Storage) {
    this.localStorageService = localStorage;
    this.loadSessionData();
    this.loadAuthToken();
  }

  async loadSessionData() {
    const res = await this.storage.get("session-livestat");
    // console.log(res);
    this.session = res;
  }

  async loadAuthToken() {
    const res = await this.storage.get("authToken");
    // console.log(res);
    this.token = res;
  }

  setCurrentSession(session): void {
    this.session = session;
    this.storage.set("session-livestat", session);
    this.localStorageService.setItem("session-livestat", JSON.stringify(session));
  }
  setAuthToken(token): void {
    this.token = token;
    this.storage.set("authToken", token);
    this.localStorageService.setItem("authToken", token);
  }

  setPictureSession(picture) {
    const SESSION = this.session;

    SESSION.picture = picture;

    this.setCurrentSession(SESSION);
  }

  removeCurrentSession(): void {
    this.storage.remove("session-livestat");
    this.localStorageService.removeItem("session-livestat");
    this.session = null;
  }

  removeAuthToken(): void {
    this.storage.remove("authToken");
    this.localStorageService.removeItem("authToken");
    this.token = null;
  }
}
