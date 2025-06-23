import { doctor } from "./doctor";
import { patient } from "./patient";

export class appointment{
    public id!:number;
    public patient!:patient;
    public doctor!:doctor;
    public dateAppointment!:Date;
    public timeAppointment!:string;
    constructor(id:number,patient:patient,doctor:doctor,dateAppointment:Date,timeAppointment:string){
        this.id=id;
        this.patient=patient;
        this.doctor=doctor;
        this.dateAppointment=dateAppointment;
        this.timeAppointment=timeAppointment;
    }
}