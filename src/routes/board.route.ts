import { Router } from "express";
import { body } from 'express-validator';
import { BoardController } from "../controller/board.controller";



const routerBoard = Router();

routerBoard.get('/', BoardController.get);

routerBoard.post('/',
    [
        body('idProyect').not().isEmpty().trim().escape().withMessage('El proyecto es obligatorio.'),
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], BoardController.post);

routerBoard.put('/:id',
    [
        body('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio.'),
    ], BoardController.put);
export default routerBoard;