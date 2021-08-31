import { Router } from "express";
import { body } from 'express-validator';
import { TaskDetailController } from "../controller/taskDetail.controller";



const routerTaskDetail = Router();

routerTaskDetail.get('/', TaskDetailController.get);

routerTaskDetail.post('/',
    [
        body('idTask').not().isEmpty().trim().escape().withMessage('La tarea es obligatoria.'),
        body('description').not().isEmpty().trim().escape().withMessage('La descripción es obligatoria.'),
    ], TaskDetailController.post);

routerTaskDetail.put('/:id',
    [
        body('description').not().isEmpty().trim().escape().withMessage('La descripción es obligatoria.'),
    ], TaskDetailController.put);
export default routerTaskDetail;