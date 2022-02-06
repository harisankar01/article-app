import { ObjectId } from "mongodb";
export default class Login {
    constructor(public name: string, public pass: string, public user_type: string, public id?: ObjectId) {}
}