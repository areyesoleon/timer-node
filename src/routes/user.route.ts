import {  Router } from "express";
import { UserController } from "../controller/user.controller";
import { check } from 'express-validator';
import { UserValidators } from "../helpers/user-validators.helper";


const router = Router();

router.get('/', UserController.get);

router.post('/',[check('email').custom(UserValidators.emailExist)], UserController.post);
export default router;