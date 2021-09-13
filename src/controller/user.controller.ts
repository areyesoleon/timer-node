import bcryptjs from 'bcryptjs';
import express, { request, response } from 'express';
import { validationResult } from 'express-validator';
import { UserValidators } from '../helpers/user-validators.helper';
import User, { IUser } from '../models/user.model';

export class UserController {
    static async get(req = request, res = response) {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.json({
            total,
            users
        });
    }

    static async post(req: express.Request, res = response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const { password } = req.body;
            const user = new User(req.body);
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);
            user.status = 0;
            await user.save();
            const token = await UserValidators.generateJWT(user.id);
            user.password = '';
            const body: IUser = user;
            return res.json({
                body: user.user,
                token,
                ok: true
            })
        } catch (error) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
    }


    static async put(req: express.Request, res = response) {

        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const body = req.body;
            delete body.password;
            delete body.email;
            await User.findByIdAndUpdate(id, body)
            return res.json({
                body,
                ok: true
            })
        } catch (error) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
    }
}
