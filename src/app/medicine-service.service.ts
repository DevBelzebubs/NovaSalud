import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineServiceService {

    url = ''
    constructor(private httpClient:HttpClient){}
    addMedicine(medicine:any):Observable<any>{
      return this.httpClient.post<any>(this.url, medicine);
    }
    listMedicines():Observable<any[]>{
      return this.httpClient.get<any[]>(this.url);
    }
    getMedicine(id:number):Observable<any>{
      return this.httpClient.get<any>(this.url + '/' + id);
    }
    editMedicine(medicine:any):Observable<any>{
      return this.httpClient.put<any>(this.url + '/' + medicine.id, medicine);
    }
    deleteMedicine(id:number):Observable<any>{
      return this.httpClient.delete<any>(this.url + '/' + id);
    }
}
