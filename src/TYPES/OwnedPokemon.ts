import { ObjectId } from "mongodb"

export type OwnedPokemon = {

    _id: ObjectId;
    pokemon: ObjectId;
    nickname: string;
    attack: number;
    defense: number;
    speed: number;
    special: number;
    level: number;
    
};