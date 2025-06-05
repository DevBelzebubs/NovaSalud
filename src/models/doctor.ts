import { Time } from "@angular/common";
import { speciality } from "./speciality";
import { user } from "./user";
import { prescription } from "./prescription";

export class doctor{
    constructor(
        public id:number | undefined,
        public usuario:user,
        public especialidad:speciality, 
        public horarioAtencion:string) {
  }
}