import { connect } from 'mongoose';

export class MongooseConect {
    static async connection() {
        try {
            await connect(process.env.MONGODB_CNN!);
            console.log('conection success');
        } catch (error) {
            console.log(error);
        }
    }
}