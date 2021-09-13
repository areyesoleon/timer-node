import express, { response } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user.model';

export class UserValidators {

    static async emailExist(email = '') {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return Promise.reject(`El correo: ${email}, ya esta registrado`);
        }
    }

    static generateJWT(uid = '') {
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, String(process.env.SECRETORPRIVATEKEY), {
                expiresIn: '7d'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
        })
    }

    static async validateJWT(req: express.Request, res = response, next: any) {
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }

        try {
            const uid = jwt.verify(token, String(process.env.SECRETORPRIVATEKEY),async (err, decoded)=>{
                const user = await User.findById(decoded!.uid);
                if (!user) {
                    return res.status(401).json({
                        errrors: 'Token no válido - usuario no existe DB'
                    })
                }
                 if (!user.status) {
                    return res.status(401).json({
                        msg: 'Token no válido - usuario con estado: false'
                    })
                }
                req.body.user = user;
                next();
            });
            

        } catch (error) {
            res.status(401).json({
                errors: 'Token no válido'
            })
        }
    }
}