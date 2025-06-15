import { user } from "./user";

export class recepcionist{
    id:number | undefined;
    usuario!:user;
    constructor(id:number | undefined,usuario:user){
        this.id=id;
        this.usuario=usuario;
    }
}