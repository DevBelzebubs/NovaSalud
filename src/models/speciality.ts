import { doctor } from "./doctor";

export class speciality{
    private id!: number;
    public name!: string;
    private description!: string;
    private doctor!:doctor[];

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}