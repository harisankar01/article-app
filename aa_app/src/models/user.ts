// import { ObjectId } from "mongodb";
// export default class Login {
//     constructor(public name: string, public pass: string, public user_type: string, public id?: ObjectId) {}
// }
import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name of new user"],
        maxlength:20,
    },
    password:{
        type:String,
        required:[true,"keep your password secure"],
    },
     email:{
        type:String,
        required:true,
        maxlength:25,
    },
    user_type:{
        type:String,
        required:[true,"may be admin or author"],
        maxlength:12,
    }
})
export default mongoose.models.User || mongoose.model('User',UserSchema)