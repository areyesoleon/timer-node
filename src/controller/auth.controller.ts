import express, { response } from "express";
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { UserValidators } from "../helpers/user-validators.helper";



export class AuthController {
    static async login(req: express.Request, res = response) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    errors: 'El usuario o contrasena son incorrectos.',
                    ok: false
                });
            }

            switch (user.status) {
                case 0:
                    res.status(400).json({
                        errors: 'El usuario no esta activo, revisa tu correo.',
                        ok: false
                    });
                    break;
                case 2:
                    res.status(400).json({
                        errors: 'El usuario se encuentra bloqueado.',
                        ok: false
                    });
                    break;
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password'
                });
            }
            const token = await UserValidators.generateJWT(user.id);
            res.json({
                body: user.user,
                token,
                ok: true
            })
        } catch (error) {
            res.status(400).json({
                errors: 'Error al intentar ingresar al sistema.',
                ok: false
            });
        }
    }

    static async auth(req: express.Request, res = response) {
        const token = await UserValidators.generateJWT(req.body._id);
        res.json({
            body: req.body.user.user,
            token,
            ok: true
        })
    }
}