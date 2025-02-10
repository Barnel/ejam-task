import 'dotenv/config';
import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';
import HeroController from './controllers/hero.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger';

const { DB_PORT, DB_NAME, SERVER_PORT } = process.env;

const swaggerDocs = swaggerJsDoc(swaggerOptions);

class App {
    public app: express.Application;
    public controllers: Controller[];

    constructor() {
        this.app = express();
        this.controllers = [new HeroController()];

        this.initializeMiddleware();
        this.initializeControllers();
        this.connectToTheDatabase();
    }

    private async connectToTheDatabase() {
        const url = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;
        await mongoose.connect(url);
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors()).use(express.json()).options('*', cors());
    }

    private initializeControllers() {
        this.controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    listen() {
        this.app.listen(SERVER_PORT, () => {
            console.log(`[server]: running at http://localhost:${SERVER_PORT}`);
        });
    }
}

export default App;
