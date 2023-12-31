import mongoose from 'mongoose';
export interface IUser{
    name: string;
    email:String;
    password:string;
    mobileNumber: number;
    role: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true, min: 10 },
    role: { type: String, enum: ["CREATOR", "VIEWER", "VIEW_ALL"], required: true }
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;