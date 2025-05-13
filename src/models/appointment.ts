import { doctor } from "./doctor";
import { patient } from "./patient";

export class appointment{
    private id!:number;
    private patient!:patient;
    private doctor!:doctor;
    private dateAppointment!:Date;
    private timeAppointment!:string;
    constructor(id:number,patient:patient,doctor:doctor,dateAppointment:Date,timeAppointment:string){
        this.id=id;
        this.patient=patient;
        this.doctor=doctor;
        this.dateAppointment=dateAppointment;
        this.timeAppointment=timeAppointment;
    }
}