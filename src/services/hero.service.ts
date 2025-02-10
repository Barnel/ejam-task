import {
    Hero,
} from '../interfaces/hero.interface';
import heroModel from '../models/hero.model';

class HeroService {
    constructor() {}

    async createHero(hero: Hero) {
        return await heroModel.create(hero);
    };
    
    async getHeroes(page: number, size: number) {
        return await heroModel.find({}, {}, { skip: (page-1)*size, limit: size });
    };
}

export default HeroService;
