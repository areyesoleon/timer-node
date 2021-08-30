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
            return res.status(400).json({ errors: errors.array(), ok:false });
          }
        try {
            const { names, lastNames, user, email, password } = req.body;
            const userDb = new User({ names, lastNames, user, email, password });
            await userDb.save();
            return res.json({
                userDb,
                ok: true
            })
        } catch (error) {
            console.log(error)
        }
       
    }
}
