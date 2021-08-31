import { Router } from "express";
import { body } from 'express-validator';
import { BoardAccessController } from "../controller/boardAccess.controller";



const routerBoardAccess = Router();

routerBoardAccess.get('/', BoardAccessController.get);

routerBoardAccess.post('/',
    [
        body('idBoard').not().isEmpty().trim().escape().withMessage('El tablero es obligatorio.'),
        body('idUser').not().isEmpty().trim().escape().withMessage('El usuario es obligatorio.'),
    ], BoardAccessController.post);

routerBoardAccess.delete('/:id', BoardAccessController.delete);
export default routerBoardAccess;