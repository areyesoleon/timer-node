import mongoose, { Document, Schema } from 'mongoose';

export interface IProyect extends Document {
    idCompany: string,
    name: string,
    minutes?: number,
    realMinutes?: number,
    initDate?: Date,
    finishDate?: Date
}

const ProyectSchema: Schema = new Schema({
    idCompany: {
        type: String,
        required: [true, 'La empresa es obligatoria']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    minutes: {
        type: Number,
    },
    realMinutes: {
        type: Number
    },
    initDate: {
        type: Date
    },
    finishDate: {
        type: Date
    }
});


export default mongoose.model<IProyect>('Proyect', ProyectSchema);