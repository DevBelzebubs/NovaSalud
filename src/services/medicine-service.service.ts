import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { medicine } from '../models/medicine';
import { Medicamento } from '../app/interfaces/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicineServiceService {

    url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/recepcionista/medicamento'
    constructor(private httpClient:HttpClient){}
    addMedicine(medicine:any):Observable<medicine>{
      return this.httpClient.post<any>(this.url + '/crear', medicine);
    }
    listMedicines():Observable<medicine[]>{
      return this.httpClient.get<any[]>(this.url + '/listar');
    }
    listMedicinesDoctor(): Observable<Medicamento[]> {
  return this.httpClient.get<any[]>(this.url + '/listar').pipe(map(data => data.map(item => ({
        id: Number(item.id),
        nombre: item.nombre,
        stock: Number(item.cantidad),
        precio: Number(item.precio_unitario)
        })))
      );
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