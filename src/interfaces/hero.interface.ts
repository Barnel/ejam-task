import { z } from 'zod';


export interface Hero {
    name: string;
    superpower: string;
    humilityScore: number;
}

export interface RawHero {
    name: string;
    superpower: string;
    humilityScore: number;
    _id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}

export const mapHero = (rawHero: RawHero) => {
    return {
        id: rawHero._id,
        name: rawHero.name,
        superpower: rawHero.superpower,
        humilityScore: rawHero.humilityScore
    }
}

const hero = z.object({
    name: z.string(),
    superpower: z.string(),
    humilityScore: z.number().gte(1).lte(10)
});

const partialHero = hero.partial();

export const isHeroValid = (inputs: unknown) => hero.parse(inputs);
export const isPartialHeroValid = (inputs: unknown) => partialHero.parse(inputs)
