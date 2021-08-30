import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
   _id?: string,
   name: string
}

const CompanySchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
});


export default mongoose.model<ICompany>('Company', CompanySchema);