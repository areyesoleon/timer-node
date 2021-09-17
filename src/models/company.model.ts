import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string,
    active: boolean
}

const CompanySchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
    },
    active: {
        type: Boolean,
        required: [true, 'El estado de la empresa es obligatorio.']
    }
});


export default mongoose.model<ICompany>('Company', CompanySchema);