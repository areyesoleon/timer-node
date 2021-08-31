import express, { request, response } from 'express';
import { validationResult } from 'express-validator';
import TaskFile from '../models/taskFile.model';


export class TaskFileController {
    static async get(req = request, res = response) {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, body] = await Promise.all([
            TaskFile.countDocuments(query),
            TaskFile.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.json({
            total,
            body
        });
    }

    static async post(req: express.Request, res = response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const body = new TaskFile(req.body);
            await body.save();
            return res.json({
                body,
                ok: true
            })
        } catch (error) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
    }

    static async delete(req: express.Request, res = response) {
        const { id } = req.params;
        const opt = await TaskFile.findByIdAndDelete(id);
        res.json(opt);
    }
}
