import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    names: string,
    lastNames: string,
    user: string,
    email: string,
    password: string,
    status: number
}

const UserSchema: Schema = new Schema({
    names: {
        type: String,
        required: [true, 'Los nombres son obligatorios.']
    },
    lastNames: {
        type: String,
        required: [true, 'Los apellidos son obligatorios.']
    },
    user: {
        type: String,
        required: [true, 'El usuario es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio.']
    },
    status: {
        type: Number
    }
});


export default mongoose.model<IUser>('User', UserSchema);