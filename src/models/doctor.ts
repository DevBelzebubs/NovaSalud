import { Time } from "@angular/common";
import { speciality } from "./speciality";
import { user } from "./user";
import { prescription } from "./prescription";

export class doctor {
  constructor(
    public id: number | undefined,
    public username: string,
    public nombre: string,
    public apellido: string,
    public contrasena: string,
    public numero: string,
    public sexo: string,
    public especialidad: string
  ) {}
}
