export class medicine{
    constructor(
        public id:number |undefined,
        public nombre:string,
        public descripcion:string,
        public fecha_ingreso:string,
        public fecha_vencimiento:string,
        public cantidad:number,
        public precio_unitario:number){
    }
}