import { doctor } from "./doctor";

export class speciality{
    id?: number;
    nombre: string;
    descripcion?: string;

    constructor(id: number | undefined, nombre: string, descripcion?: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
  }
}