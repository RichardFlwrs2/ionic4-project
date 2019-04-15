import { Observable, Subscription, Subject } from 'rxjs';
import { Direccion } from './Direccion';

export interface CampoExtra {
  idCampoExtra: number;
  idCampoType: number;
  nombre: string;
  tipo: string;
  catalogoAnswers?: any[];
  address?: Direccion;
  valueChanges: Subscription;
}

// export interface CampoExtra {
//   idCampoExtra: number;
//   idCampoType: number;
//   nombre: string;
//   tipo: string;
//   address?: {};
//   getAdress: Subject;
// }
