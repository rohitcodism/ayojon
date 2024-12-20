import mongoose, { Schema, Document, SchemaType } from 'mongoose';


export interface User extends Document {
    username: string,
    fullname: string,
    email: string,
    profilePicture: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    oAuth: boolean
}

const userSchema: Schema<User> = new Schema({
        username: {
            type: String,
            required: [true, "Username is required!!"],
            unique: true
        },
        fullname: {
            type: String,
            required: [true, "Full name is required!!"]
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
            required: function() { return !this.oAuth },
        },
        verifyCode: {
            type: String,
            required: function() { return !this.oAuth }
        },
        verifyCodeExpiry: {
            type: Date,
            required: true,
            default: Date.now() + 3600000
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        oAuth: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema));

export default UserModel;