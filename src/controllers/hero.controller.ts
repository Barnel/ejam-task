import 'dotenv/config';
import * as express from 'express';
import { HTTP_STATUS } from '../utils/httpStatuses';
import Controller from '../interfaces/controller.interface';
import HeroService from '../services/hero.service';
import { ERROR_TYPES } from '../utils/errorTypes';
import { zodErrorMessage } from '../utils/errorMessages';
import { isHeroValid, mapHero, RawHero } from '../interfaces/hero.interface';

const { MODE } = process.env;

class HeroController implements Controller {
    public path: string;
    public router: express.Router;
    public service: HeroService;

    public dbPath: string;
    public heroes: any[];

    constructor() {
        this.path = '/superheroes';
        this.dbPath = '/db/superheroes';
        this.router = express.Router();
        this.service = new HeroService();
        this.heroes = []

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getHeroes);
        this.router.post(this.path, this.createHero);
        this.router.get(this.dbPath, this.getDBHeroes);
        this.router.post(this.dbPath, this.createDBHero);
    }


    createHero = async (req: express.Request, res: express.Response) => {
        try {
            const heroData = req.body;

            isHeroValid(heroData);

            this.heroes.push(heroData)

            res.status(HTTP_STATUS.CREATED).send(heroData);
        } catch (e) {
            if (e.name === ERROR_TYPES.ZOD_ERROR) {
                const message = zodErrorMessage(e);

                res.status(HTTP_STATUS.BAD_REQUEST).send({ message });
            } else {
                res.status(HTTP_STATUS.SERVER_ERROR).send(e.message);
            }
        }
    };

    getHeroes = async (req: express.Request, res: express.Response) => {
        try {
            res.status(HTTP_STATUS.OK).send(this.heroes);
        } catch (e) {
            res.send(e.message).status(HTTP_STATUS.SERVER_ERROR);
        }
    };

    createDBHero = async (req: express.Request, res: express.Response) => {
        try {
            if (MODE === 'in-memory-only') {
                res.status(HTTP_STATUS.BAD_REQUEST).send('This request does not exist using in-memory-only mode');
                res.send();
            }

            const heroData = req.body;

            isHeroValid(heroData);

            const createdHero = await this.service.createHero(req.body);
            const mappedHero = mapHero(createdHero as unknown as RawHero)

            res.status(HTTP_STATUS.CREATED).send(mappedHero);
        } catch (e) {
            if (e.name === ERROR_TYPES.ZOD_ERROR) {
                const message = zodErrorMessage(e);

                res.status(HTTP_STATUS.BAD_REQUEST).send({ message });
            } else {
                res.status(HTTP_STATUS.SERVER_ERROR).send(e.message);
            }
        }
    };

    getDBHeroes = async (req: express.Request, res: express.Response) => {
        try {
            if (MODE === 'in-memory-only') {
                res.status(HTTP_STATUS.BAD_REQUEST).send('This request does not exist using in-memory-only mode');
            }

            const page = Number(req.query.page) ?? 1;
            const size = Number(req.query.size) ?? 5;

            const heroes = await this.service.getHeroes(page, size);
            const mappedHeroes = heroes.map(hero => mapHero(hero as unknown as RawHero))

            res.status(HTTP_STATUS.OK).send(mappedHeroes);
        } catch (e) {
            res.send(e.message).status(HTTP_STATUS.SERVER_ERROR);
        }
    };
}

export default HeroController;
