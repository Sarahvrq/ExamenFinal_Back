import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { OWNEDPOKEMONS_COLLECTION, POKEMONS_COLLECTION, TRAINER_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";


export const getPokemons = async (page: number, size: number) => {
    const db = getDB();
        page = page || 1;
        size = size || 10;
    const result = await db.collection(POKEMONS_COLLECTION).find().skip((page-1)*size).limit(size).toArray();
    return result;
}

export const getPokemon = async (poke_id: ObjectId) => {
    const db = getDB();
    const POKE = await db.collection(POKEMONS_COLLECTION).findOne({_id: new ObjectId(poke_id)});
    if (!POKE) throw new Error ("ERROR: Pokemon no encontrado");
    return POKE;
};



export const createPoke = async(name: string, description: string, height: Number, weight: Number, types: Enumerator) => {
    const db = getDB();

    const Insertresult = await db.collection(POKEMONS_COLLECTION).insertOne({name, description, height, weight, types});
    if(!Insertresult) throw new Error ("ERROR: No se pudo añadir restaurante. Revisa los campos");
    
    return await getPokemon(Insertresult.insertedId)

};



