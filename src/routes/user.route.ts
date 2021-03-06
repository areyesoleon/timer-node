import { AuthController } from './../controller/auth.controller';
import { Router } from "express";
import { body } from 'express-validator';
import { UserController } from "../controller/user.controller";
import { UserValidators } from "../helpers/user-validators.helper";



const router = Router();

router.get('/', UserController.get);

router.post('/',
    [
        body('names').not().isEmpty().trim().escape().withMessage('Los nombres son obligatorios.'),
        body('lastNames').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios.'),
        body('user').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
        body('password').isLength({ min: 8 }),
        body('email').isEmail().withMessage('El correo no es un correo valido.'),
        body('email').custom(UserValidators.emailExist)
    ], UserController.post);

router.put('/:id',
    [
        body('names').not().isEmpty().trim().escape().withMessage('Los nombres son obligatorios.'),
        body('lastNames').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios.'),
        body('user').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
    ], UserController.put);

router.post('/login',
    [
        body('email').isEmail().withMessage('El correo no es un correo valido.'),
        body('email').custom(UserValidators.emailExist),
        body('password').isLength({ min: 8 }),
    ], AuthController.login);

    router.get('/auth',
    [
        UserValidators.validateJWT
    ], AuthController.auth);
export default router;