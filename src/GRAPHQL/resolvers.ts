import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo";
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import {
  TRAINER_COLLECTION,
  POKEMONS_COLLECTION,
  OWNEDPOKEMONS_COLLECTION,
} from "../utils";
import { createPoke, getPokemon, getPokemons } from "../COLLECTIONS/Pokemons";
import { CreateTRAINER, TrainersOwnedPokemonsArray, validateTRAINER } from "../COLLECTIONS/Trainers";
import { addPokeToOwned, deletePokeFromOwned } from "../COLLECTIONS/OwnedPokemons";
import { OwnedPokemon, } from "../TYPES/OwnedPokemon";
import { Trainer } from "../TYPES/Trainer";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Login necesaria");
      return { _id: user._id.toString(), ...user };
    },

    pokemons: async (_, { page, size }) => {
      return await getPokemons(page, size);
    },

    pokemon: async (_, { _id }) => {
      return await getPokemon(_id);
    },
  },

  Mutation: {
    startJourney: async (_,{name,password}) => {
        const UserId = await CreateTRAINER(name, password);
        return signToken(UserId);
    },

    login: async (_,{name,password}) => {
        const user = await validateTRAINER(name, password);
        if(!user) throw new Error ("ERROR: Credenciales incorrectos");
        return signToken(user._id.toString());
    },


    createPokemon: async (_, {name, description, height, weight, types}, {user}) => {
        if(!user) throw new Error ("ERROR: Necesitas estar logeado para catch pokemon");
        return await createPoke(name, description, height, weight, types);
    },

    catchPokemon: async (_,{pokemon}, {ownedPokemon}) => {
        return await addPokeToOwned(pokemon, ownedPokemon);
    },

    freePokemon: async (_, {_id}, {trainer}) => {
            if(!trainer) throw new Error ("ERROR: Necesitas estar logeado para free un pokemon");
            return await deletePokeFromOwned(new ObjectId(_id));
    },
  },

  Trainer: {
    pokemons: async (parent: Trainer) => {
            return await TrainersOwnedPokemonsArray(parent.pokemons);
    },
  },

  OwnedPokemon: {
    pokemon: async (parent: OwnedPokemon) => {
        return await getPokemon(parent.pokemon);
    },
  },
};
