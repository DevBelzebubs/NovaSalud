import { Role } from "./role";
import { status } from "./status";

export class user{
    id!:number;
    private nameUs!:string;
    private contraUs!:string;
    private name!:string;
    private lastName!:string;
    private dni!:string;
    private numberPhone!:string;
    private sex!:string;
    private rol!:Role;
    private status!:status;
    constructor(id:number,nameUs:string,contraUs:string,name:string,lastName:string,dni:string,numberPhone:string,sex:string,rol:Role,status:status){
        this.id=id;
        this.nameUs=nameUs;
        this.contraUs=contraUs;
        this.name=name;
        this.lastName=lastName;
        this.dni=dni;
        this.numberPhone=numberPhone;
    }
}