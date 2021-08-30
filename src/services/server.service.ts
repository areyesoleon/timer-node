import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { MongooseConect } from '../database/config';
import routerCompany from '../routes/company.route';
import routerCompanyAccess from '../routes/companyAccess.route';
import routerUser from '../routes/user.route';

export class Server {
    private _app;
    private _port;
    private _path: any;
    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._path = {
            user: '/api/user',
            company: '/api/company',
            companyAccess: '/api/companyAccess'
        }

        //Mongo conection
        MongooseConect.connection();

        // Middlewares
        this._middlewares();

        // Rutas de mi aplicación
        this._routes();
    }

    private _middlewares() {
        //CORS
        this._app.use(cors());

        // Lectura y parseo del body
        this._app.use(json());
    }

    private _routes() {
        this._app.use(this._path.user, routerUser);
        this._app.use(this._path.company, routerCompany);
        this._app.use(this._path.companyAccess, routerCompanyAccess);
    }

    listen() {
        this._app.listen(this._port, () => {
            console.log('Servidor corriendo en puerto', this._port);
        });
    }
}