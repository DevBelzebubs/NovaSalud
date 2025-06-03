import { Time } from "@angular/common";
import { speciality } from "./speciality";
import { user } from "./user";
import { prescription } from "./prescription";

export class doctor{
    constructor(public nombre:string, 
        public apellido:string, 
        public numero:string,
        public sexo:string, 
        public especialidad:string, 
        public horarioAtencion:string) {
  }
}