import { user } from "./user";

export class patient {
  constructor(
    public id: number | undefined,
    public dni: string,
    public nombre: string,
    public apellido: string,
    public contrasena: string,
    public numero: string,
    public sexo: string
  ) {}
}
