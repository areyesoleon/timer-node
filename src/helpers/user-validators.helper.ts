import User from '../models/user.model';


export class UserValidators {
    static async emailExist(email = '') {
        console.log(email);
        const emailExist = await User.findOne({ email });
        console.log(emailExist);
        if (emailExist) {
            return  new Error(`El correo: ${email}, ya está registrado`);
        }
    }
}