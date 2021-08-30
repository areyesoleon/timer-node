import { Router } from "express";
import { body } from 'express-validator';
import { ProyectController } from "../controller/proyect.controller";



const routerProyect = Router();

routerProyect.get('/', ProyectController.get);

routerProyect.post('/',
    [
        body('idCompany').not().isEmpty().trim().escape().withMessage('La empresa es obligatoria.'),
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], ProyectController.post);

routerProyect.put('/:id',
    [
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], ProyectController.put);
export default routerProyect;