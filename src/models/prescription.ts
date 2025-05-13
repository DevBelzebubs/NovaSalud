import { doctor } from "./doctor";
import { patient } from "./patient";

export class prescription{
    private id!:number;
    private doctor!:doctor;
    private patient!:patient;
    private medicine!:string;
    private message!:string;
    private dateCreated!:string;
    constructor(id:number,doctor:doctor,patient:patient,medicine:string,message:string,dateCreated:string){
        this.id=id;
        this.doctor=doctor;
        this.patient=patient;
        this.medicine=medicine;
        this.message=message;
        this.dateCreated=dateCreated;
    }
}