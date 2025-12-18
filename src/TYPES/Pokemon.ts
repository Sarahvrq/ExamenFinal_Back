
import { ObjectId } from "mongodb"

export type Pokemon = {
  _id: ObjectId;
  name: string;
  description: string;
  height: Number;
  weight: Number;
  types: [Enumerator]
  
};