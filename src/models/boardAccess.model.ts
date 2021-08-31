import mongoose, { Schema, Document } from 'mongoose';

export interface IBoardAccess extends Document {
   idBoard: string,
   idUser: string
}

const BoardAccessSchema: Schema = new Schema({
    idBoard: {
        type: String,
        required: [true, 'El tablero es obligatorio.']
    },
    idUser: {
        type: String,
        required: [true, 'El usuario es obligatorio.']
    },
});


export default mongoose.model<IBoardAccess>('BoardAccess', BoardAccessSchema);