import User from '../models/user.model';


export class UserValidators {

    static async emailExist(email = '') {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return Promise.reject(`El correo: ${email}, ya esta registrado`);
        }
    }
}