import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { TRAINER_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";


        export const VerifNameDB = async (name: string) => {
        const db = getDB();
        const result = await db.collection(TRAINER_COLLECTION).findOne({ name });
        if (result)throw new Error("ERROR: Nombre ya existe");

        return name;
        };

export const CreateTRAINER = async (name: string, password: string) => {
    const db = getDB();

    const verifName = await VerifNameDB(name);
    const passEncrypt = await bcrypt.hash(password, 10);

    const result = await db.collection(TRAINER_COLLECTION).insertOne({name:verifName , password: passEncrypt});

    return result.insertedId.toString();
};

export const validateTRAINER = async (name: string, password: string) => {
    const db = getDB();
    const user = await db.collection(TRAINER_COLLECTION).findOne({name});
    if(!user) throw new Error ("ERROR: Trainer con ese correo no existe");

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) throw new Error ("ERROR: Contraseña incorrecta");

    return user;
};