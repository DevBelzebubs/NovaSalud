export class Role{
    private id!:undefined|number;
    private nombreRol!:string;
    constructor(id:undefined | number,nameRole:string){
        this.id=id;
        this.nombreRol=nameRole;
    }
}