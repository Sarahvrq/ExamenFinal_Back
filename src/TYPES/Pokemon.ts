
import { ObjectId } from "mongodb"

export type Pokemon = {
  _id: ObjectId;
  name: string;
  description: string;
  height: number;
  weight: number;
  types: [Enumerator]
  
};