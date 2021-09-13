import { Router } from "express";
import { body } from 'express-validator';
import { CompanyController } from "../controller/company.controller";
import { UserValidators } from "../helpers/user-validators.helper";



const routerCompany = Router();

routerCompany.get('/', CompanyController.get);

routerCompany.post('/',
    [
        UserValidators.validateJWT,
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], CompanyController.post);

routerCompany.put('/:id',
    [
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], CompanyController.put);
export default routerCompany;