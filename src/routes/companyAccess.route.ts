import { Router } from "express";
import { body } from 'express-validator';
import { CompanyAccessController } from "../controller/companyAccess.controller";



const routerCompanyAccess = Router();

routerCompanyAccess.get('/', CompanyAccessController.get);

routerCompanyAccess.post('/',
    [
        body('idCompany').not().isEmpty().trim().escape().withMessage('El id de la empresa es obligatorio.'),
        body('idUser').not().isEmpty().trim().escape().withMessage('el id del usuario es obligatorio.'),
    ], CompanyAccessController.post);

routerCompanyAccess.delete('/:id', CompanyAccessController.delete);
export default routerCompanyAccess;