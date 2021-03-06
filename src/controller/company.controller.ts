import express, { request, response } from 'express';
import { validationResult } from 'express-validator';
import Company from '../models/company.model';
import CompanyAccess from '../models/companyAccess.model';



export class CompanyController {
    static async get(req = request, res = response) {
        const { limite = 5, desde = 0 } = req.query;

        const [total, body] = await Promise.all([
            Company.countDocuments(),
            Company.find()
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.json({
            total,
            body,
            ok: true
        });
    }

    static async getId(req = request, res = response) {
        const { id } = req.params;

        const body = await Company.findById(id);

        return res.json({
            body,
            ok: true
        });
    }

    static async post(req: express.Request, res = response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), ok: false });
        }
        try {
            const { name, active, user } = req.body;
            const body = new Company({ name, active });
            await body.save();
            const idUser = user._id;
            const idCompany = body._id
            const companyAccess = new CompanyAccess({ idCompany, idUser });
            await companyAccess.save()
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
