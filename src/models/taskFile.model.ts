import mongoose, { Document, Schema } from 'mongoose';

export interface ITaskFile extends Document {
    idTask: string
    url: URL,
}

const TaskFileSchema: Schema = new Schema({
    idTask: {
        type: String,
        required: [true, 'La tarea es obligatoria.']
    },
    url: {
        type: String,
        required: [true, 'La url del archivo es obligatorio.']
    }
});


export default mongoose.model<ITaskFile>('TaskFile', TaskFileSchema);