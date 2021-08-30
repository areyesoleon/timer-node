import express, { request, response } from 'express';
import { validationResult } from 'express-validator';
import Company from '../models/company.model';


export class CompanyController {
    static async get(req = request, res = response) {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, body] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.json({
            total,
            companies: body
        });
    }

    static async post(req: express.Request, res = response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const { name } = req.body;
            const body = new Company({ name });
            await body.save();
            return res.json({
                body,
                ok: true
            })
        } catch (error) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
    }


    static async put(req: express.Request, res = response) {

        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const body = req.body;
            await Company.findByIdAndUpdate(id, body)
            return res.json({
                body,
                ok: true
            })
        } catch (error) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
    }
}
