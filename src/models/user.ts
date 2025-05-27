import { Role } from "./role";
import { status } from "./status";

export class user{
    constructor(
    public id: number | undefined,
    public nombreUsua: string,
    public contrasena: string,
    public nombre: string,
    public apellido: string,
    public numero: string,
    public sexo: string,
    public rol?: { nombreRol: string },
  ) {}
}