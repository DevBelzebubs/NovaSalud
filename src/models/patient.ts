import { user } from "./user";

export class patient {
    constructor(
    public id: number | undefined,
    public dni: string,
    public usuario: user
  ) {}
}