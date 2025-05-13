import { Time } from "@angular/common";
import { speciality } from "./speciality";
import { user } from "./user";
import { prescription } from "./prescription";

export class doctor{
    private id!:number;
    private speciality!: speciality;
    private user!:user;
    private atentionHour!:Time;
    private prescription!:prescription[];
}