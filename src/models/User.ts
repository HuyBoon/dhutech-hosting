import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    admin: { type: Boolean, default: false },
    superAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
