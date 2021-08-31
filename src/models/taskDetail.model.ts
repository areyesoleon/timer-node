import mongoose, { Document, Schema } from 'mongoose';

export interface ITaskDetail extends Document {
    idTask: string
    description: string,
    done: boolean,
}

const TaskDetailSchema: Schema = new Schema({
    idTask: {
        type: String,
        required: [true, 'La tarea es obligatoria.']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria.']
    },
    done: {
        type: Boolean
    },
});


export default mongoose.model<ITaskDetail>('TaskDetail', TaskDetailSchema);