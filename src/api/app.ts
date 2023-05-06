import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
import routes from '../router';

class App {
    app = express();

    constructor() {
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Controll-Allow-Origin", "*");
            res.header("Access-Controll-Alow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Controll-Alow-Headers", "Access, Content-type, Acept, Origin, X-Requested-With");
            // this.app.use(cors());
            next();
        });
    };

    routes() {
        this.app.use(routes);
    };
};

export default new App().app;