import { user } from "./user";

export class receptionist{
    id!:number;
    private user!:user;
    constructor(id:number,user:user){
        this.id=id;
        this.user=user;
    }
}