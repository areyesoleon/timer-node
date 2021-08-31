import { Router } from "express";
import { body } from 'express-validator';
import { CompanyAccessController } from "../controller/companyAccess.controller";



const routerCompanyAccess = Router();

routerCompanyAccess.get('/', CompanyAccessController.get);

routerCompanyAccess.post('/',
    [
        body('idCompany').not().isEmpty().trim().escape().withMessage('La empresa es obligatoria.'),
        body('idUser').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
    ], CompanyAccessController.post);

routerCompanyAccess.delete('/:id', CompanyAccessController.delete);
export default routerCompanyAccess;