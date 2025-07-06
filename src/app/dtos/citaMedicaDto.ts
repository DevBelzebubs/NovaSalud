export class CitaMedicaDto{
    constructor(
        public id: number =0,
        public paciente:string,
        public doctor:string,
        public fechaCita:string,
        public horaCita:string
    ){};
}