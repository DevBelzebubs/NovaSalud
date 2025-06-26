import { doctor } from "./doctor";
import { patient } from "./patient";

export class appointment{
    constructor(public doctor:doctor, 
        public localDate:Date,
        public localTime:string){
    }
}