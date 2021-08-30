import mongoose, { Document, Schema } from 'mongoose';

export interface ICompanyAccess extends Document {
    idCompany: string,
    idUser: string
}

const CompanyAccessSchema: Schema = new Schema({
    idCompany: {
        type: String,
        required: [true, 'El id de la emrpesa es obligatorio.']
    },
    idUser: {
        type: String,
        required: [true, 'El id del usuario es obligatorio.']
    },
});


export default mongoose.model<ICompanyAccess>('CompanyAccess', CompanyAccessSchema);