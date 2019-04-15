import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}
}

export interface Credential {
  idEntidad: number;
  idOwner: number;
  idUsuario: string;
  token: string;
  isLogged: boolean;
  rol: number;
  username: string;
  dir: string;
  email?: string;
  picture?: string;
  owner?: boolean;
  isOwner?: boolean;
}
