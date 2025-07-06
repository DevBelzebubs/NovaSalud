export class GestionCitaDto{
    constructor(
        public estado:string,
        public descripcionReceta:string,
        public medicamentosReceta:number[]
    ){}
}