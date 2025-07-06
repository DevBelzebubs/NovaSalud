import { Injectable } from '@angular/core';
import { recepcionist } from '../models/recepcionist';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RecepcionistServiceService {
  url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/recepcionista';
  constructor(private httpClient:HttpClient){}
  addReceptionist(recepcionist: recepcionist) {
    return this.httpClient.post<recepcionist>(this.url + '/registrar', recepcionist);
  }
  listReceptionist() {
    return this.httpClient.get<recepcionist[]>(this.url);
  }
  deleteReceptionist(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  editReceptionist(recepcionist: recepcionist) {
    return this.httpClient.put<recepcionist>(`${this.url}/${recepcionist.id}`, recepcionist);
  }
  getReceptionistById(id: number) {
    return this.httpClient.get<recepcionist>(`${this.url}/${id}`);
  }
}
