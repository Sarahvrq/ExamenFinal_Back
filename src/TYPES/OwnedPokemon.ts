import { ObjectId } from "mongodb"

export type OwnedPokemon = {

    _id: ObjectId;
    pokemon: ObjectId;
    nickname: string;
    attack: Number;
    defense: Number;
    speed: Number;
    special: Number;
    level: Number;
    
};