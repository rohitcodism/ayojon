import mongoose, { Schema, Document, SchemaType } from 'mongoose';
import { boolean } from 'zod';


export interface User extends Document {
    username : string,
    email : string,
    profilePicture: string,
    password : string,
    verifyCode : string,
    verifyCodeExpiry : Date,
    isVerified : boolean,
}

const userSchema : Schema<User> = new Schema ({
    username: {
        type: String,
        required: [true, "Username is required!!"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required!!"],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please enter a valid email address"]
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: [true,"Password is required!!"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required!!"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
        default: Date.now() + 3600000
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || ( mongoose.model<User>("User", userSchema) );

export default UserModel;