import { user } from "./user";

export class patient {
    private _id!:number;
    private _user!:user;
    private static _quotesAmount:number = 0;
    private static _recipesAmount:number = 0;
    constructor(id:number,user:user,quotesAmount:number,recipesAmount:number){
        this._id=id;
        this._user=user;
        patient._quotesAmount=quotesAmount;
        patient._recipesAmount=recipesAmount;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get user(): user {
        return this._user;
    }

    set user(value: user) {
        this._user = value;
    }

    static get quotesAmount(): number {
        return this._quotesAmount;
    }

    static set quotesAmount(value: number) {
        this._quotesAmount = value;
    }

    static get recipesAmount(): number {
        return this._recipesAmount;
    }

    static set recipesAmount(value: number) {
        this._recipesAmount = value;
    }
}