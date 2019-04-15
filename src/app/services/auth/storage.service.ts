import { Injectable } from "@angular/core";
import { Credential } from "../api/login.service";
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

  setCurrentSession(session): void {
    this.currentSession = session;
    this.localStorageService.setItem("session-livestat", JSON.stringify(session));
  }
  setAuthToken(token): void {
    this.authToken = token;
    this.localStorageService.setItem("authToken", token);
  }

  public isAuthenticated(): boolean {
    return this.loadSessionData() != null && this.loadAuthToken() != null ? true : false;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem("session-livestat");
    this.localStorageService.removeItem("directorio");
    this.localStorageService.removeItem("basePath");
    this.currentSession = null;
  }
  removeAuthToken(): void {
    this.localStorageService.removeItem("authToken");
  }
}
