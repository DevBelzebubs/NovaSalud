export class Schedule {
  constructor(
    public id: number | undefined,
    public fecha: string,
    public horaInicio: string,
    public horaFin: string
  ) {}
}