import { Router } from "express";
import { body } from 'express-validator';
import { TaskController } from "../controller/task.controller";



const routerTask = Router();

routerTask.get('/', TaskController.get);

routerTask.post('/',
    [
        body('idBoard').not().isEmpty().trim().escape().withMessage('El tablero es obligatorio.'),
        body('idUser').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
        body('description').not().isEmpty().trim().escape().withMessage('La descripcion es obligatorio.'),
        body('idState').not().isEmpty().trim().escape().withMessage('El estado es obligatorio.'),
    ], TaskController.post);

    routerTask.put('/:id',
    [
        body('idUser').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
        body('description').not().isEmpty().trim().escape().withMessage('La descripcion es obligatorio.'),
        body('idState').not().isEmpty().trim().escape().withMessage('El estado es obligatorio.'),
    ], TaskController.put);
export default routerTask;