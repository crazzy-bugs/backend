import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';

export enum UserRole {
 SAD = 'superadmin',
 AD = 'admin',
 FAC = 'faculty',
 STD = 'student',
}

export interface IUser extends Document {
 username: string;
 password: string;
 role: UserRole;
}

export const UserSchema: Schema = new Schema({
 _id: { type: Schema.Types.ObjectId, auto: true },
 username: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 role: { type: String, enum: Object.values(UserRole), required: true }, // Use enum values
},
{
 timestamps: true
});

UserSchema.pre<IUser>('save', async function(next) {
 if (!this.isModified('password')) return next();

 try {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
 } catch (error:any) {
   next(error);
 }
});

export default mongoose.model<IUser>('User', UserSchema);
