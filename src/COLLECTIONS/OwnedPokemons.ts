import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { OWNEDPOKEMONS_COLLECTION, POKEMONS_COLLECTION, TRAINER_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";
import { TrainersOwnedPokemonsArray } from "./Trainers";

/*export const CreateRandomStats = async () => {

};*/

export const addPokeToOwned = async (poke_id: ObjectId, ownedPoke_id: ObjectId) => {
    const db = getDB();

    const localPokeId = new ObjectId(poke_id);
    const localOwnPokeId = new ObjectId(ownedPoke_id);

    const pokeParaCatch = await db.collection(POKEMONS_COLLECTION).findOne({_id: localPokeId});
    if(!pokeParaCatch) throw new Error ("ERROR: Pokemon no encontrado");

    if(TrainersOwnedPokemonsArray.length === 6) 
        throw new Error ("ERROR: Ya tienes suficientes pokemones, stop");

    await db.collection(OWNEDPOKEMONS_COLLECTION).insertOne({_id: new ObjectId(poke_id)});

    const ownPokeUpdate = await db.collection(OWNEDPOKEMONS_COLLECTION).findOne({_id: localOwnPokeId});
    return ownPokeUpdate;
};

export const deletePokeFromOwned = async (ownpoke_id: ObjectId) => {
    const db = getDB();

    const result = await db.collection(OWNEDPOKEMONS_COLLECTION).deleteOne({_id: new ObjectId(ownpoke_id)});

    if(result.deletedCount === 0) throw new Error ("ERROR: Pokemon no encontrado")
    return true;
    
};