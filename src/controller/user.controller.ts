import bcryptjs from 'bcryptjs';
import express, { request, response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';

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
            const body = new User(req.body);
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(password, salt);
            body.status = 0;
            await body.save();
            body.password = '';
            return res.json({
                body,
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
