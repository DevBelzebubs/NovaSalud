export class medicamento{
    private id!:number;
    private name!:string;
    private descripction!:string;
    private dateofEntry!:string;
    private dateofExpiration!:string;
    private quantity!:number;
    private price!:number;
    constructor(id:number,name:string,descripction:string,dateofEntry:string,dateofExpiration:string,quantity:number,price:number){
        this.id=id;
        this.name=name;
        this.descripction=descripction;
        this.dateofEntry=dateofEntry;
        this.dateofExpiration=dateofExpiration;
        this.quantity=quantity;
        this.price=price;
    }
}