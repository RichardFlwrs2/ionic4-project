
export interface TaskCatalog {
  endDate?: string;
  startDate?: string;
  hasReminder?: boolean;
  idTask?: number;
  iduser?: number;
  status?: number;
  taskTypeId?: number;
  time?: number;
  timeId?: number;
  title?: string;
  username?: string;
}

export interface UserAsignedTask {
  idTaskUser?: number;
  userId?: number;
  statusId?: number; // 1: Pendiente | 2: Expirada | 3: Completada | 4: No completada | 5: Programada
  usuario?: {
    idUsuario?: number;
    username?: string;
  };
}

export interface Nota {
  idNote?: number;
  description?: string;
}

export interface DireccionArray {
  idDirection?: number;
  latitud?: number;
  longitud?: number;
  nombre?: string;
  idPicture?: number;
}

export interface Contact {
  idTaskContact?: number;
  contactId?: number;
}

export interface Company {
  idTaskCompany?: number;
  companyId?: number;
}

export interface Form {
  idTaskForm?: number;
  formId?: number;
}

export interface UserTask {
  idTaskUser?: number;
  statusId?: number;
  userId?: number;
  usuario?: {
    idUsuario?: number;
    username: string;
  };
}
export interface UserFilterTask {
  checked?: boolean;
  idUsuario?: number;
  isToFilter?: boolean;
  nombre?: string;
  picture?: string;
  telefonos?: string;
}
