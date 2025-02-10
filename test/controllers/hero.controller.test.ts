import { describe, expect, test } from '@jest/globals';
import { isHeroValid } from '../../src/interfaces/hero.interface';
import { ERROR_TYPES } from '../../src/utils/errorTypes';

describe('Hero Data', () => {
    describe('Zod validation works properly', () => {
        test('heroData validation happy path', () => {
            const heroData = {
                name: "hero name",
                superpower: "flying",
                humilityScore: 5,
            };
            const hero = isHeroValid(heroData);
            expect(hero.name).toEqual(heroData.name);
        });

        test('heroData validation missing required param', () => {
            const heroData = {
                superpower: 'breathing under water'
            };

            try {
                isHeroValid(heroData);
            } catch (e) {
                expect(e.name).toEqual(ERROR_TYPES.ZOD_ERROR);
                expect(e.issues[0].message).toEqual('Required');
            }
        });

        test('heroData validation wrong type', () => {
            const heroData = {
                name: 111,
                superpower: 2
            };

            try {
                isHeroValid(heroData);
            } catch (e) {
                expect(e.name).toEqual(ERROR_TYPES.ZOD_ERROR);
                expect(e.issues[0].message).toEqual('Expected string, received number');
            }
        });
    });
});
