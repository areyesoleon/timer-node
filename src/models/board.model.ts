import mongoose, { Document, Schema } from 'mongoose';

export interface IBoard extends Document {
    idProyect: string,
    name: string,
    description: string;
    minutes?: number,
    realMinutes?: number,
    initDate?: Date,
    finishDate?: Date

}

const BoardSchema: Schema = new Schema({
    idProyect: {
        type: String,
        required: [true, 'El proyecto es obligatorio.']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    description: {
        type: String
    },
    minutes: {
        type: Number,
    },
    realMinutes: {
        type: Number,
    },
    initDate: {
        type: Date,
    },
    finishDate: {
        type: Date,
    }
});


export default mongoose.model<IBoard>('Board', BoardSchema);