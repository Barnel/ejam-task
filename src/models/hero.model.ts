import * as mongoose from 'mongoose';
import { Hero } from '../interfaces/hero.interface';

const heroSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        superpower: String,
        humilityScore: Number,
    },
    { timestamps: true },
);

const heroModel = mongoose.model<Hero & mongoose.Document>('Hero', heroSchema);

export default heroModel;
