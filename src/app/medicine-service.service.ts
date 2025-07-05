import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineServiceService {

    url = 'http://localhost:8080/api/recepcionista/medicamento'
    constructor(private httpClient:HttpClient){}
    addMedicine(medicine:any):Observable<medicine>{
      return this.httpClient.post<any>(this.url + '/crear', medicine);
    }
    listMedicines():Observable<medicine[]>{
      return this.httpClient.get<any[]>(this.url + '/listar');
    }
    getMedicine(id:number |undefined ):Observable<medicine>{
      return this.httpClient.get<any>(this.url + '/listar/' + id);
    }
    editMedicine(id:number | null, medicine:any):Observable<medicine>{
      return this.httpClient.put<any>(this.url + '/actualizar/' + id, medicine);
    }
    deleteMedicine(id:number):Observable<any>{
      return this.httpClient.delete<any>(this.url + '/eliminar/' + id);
    }
}