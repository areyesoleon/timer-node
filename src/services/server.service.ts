import express from 'express';
import { json } from 'body-parser';
import { MongooseConect } from '../database/config';
import cors from 'cors';
import router from '../routes/user.route';

export class Server {
    private _app;
    private _port;
    private _path: any;
    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._path = {
            users: '/api/user'
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
        this._app.use(this._path.users, router);
    }

    listen() {
        this._app.listen(this._port, () => {
            console.log('Servidor corriendo en puerto', this._port);
        });
    }
}