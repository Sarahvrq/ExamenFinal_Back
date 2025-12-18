import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { TRAINER_COLLECTION, POKEMONS_COLLECTION,OWNEDPOKEMONS_COLLECTION  } from "../utils";

export const resolvers: IResolvers = {

};