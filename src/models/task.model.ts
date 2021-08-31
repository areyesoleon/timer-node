import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    idBoard: string,
    idUser: string,
    cod: number;
    name: string,
    description: string,
    idState: string,
    initDate: Date,
    finishDate: Date,
    minutes: number,
    realMinutes: number

}

const TaskSchema: Schema = new Schema({
    idBoard: {
        type: String,
        required: [true, 'El tablero es obligatorio']
    },
    idUser: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    idState: {
        type: String,
        required: [true, 'El estado es obligatorio.']
    },
    initDate: {
        type: Date,
    },
    finishDate: {
        type: Date,
    },
    minutes: {
        type: Number,
    },
    realMinutes: {
        type: Number,
    },
});


export default mongoose.model<ITask>('Task', TaskSchema);