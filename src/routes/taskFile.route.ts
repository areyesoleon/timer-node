import { Router } from "express";
import { body } from 'express-validator';
import { TaskFileController } from "../controller/taskFile.controller";



const routerTaskFile = Router();

routerTaskFile.get('/', TaskFileController.get);

routerTaskFile.post('/',
    [
        body('idTask').not().isEmpty().trim().escape().withMessage('La tarea es obligatoria.'),
        body('url').not().isEmpty().trim().escape().withMessage('La url del archivo es obligatoria.'),
    ], TaskFileController.post);

routerTaskFile.put('/:id', TaskFileController.delete);
export default routerTaskFile;