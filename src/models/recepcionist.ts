import { user } from "./user";

export class recepcionist {
  constructor(
    public id: number | undefined,
    public username: string,
    public nombre: string,
    public apellido: string,
    public contrasena: string,
    public numero: string,
    public sexo: string
  ) {}
}
