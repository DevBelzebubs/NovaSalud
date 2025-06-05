import { doctor } from "./doctor";

export class speciality{
    private id: number | undefined;
    public name!: string;
    private description!: string;
    private doctor!:doctor[];

    constructor(id: number | undefined, name: string) {
        this.id = id;
        this.name = name;
    }
}