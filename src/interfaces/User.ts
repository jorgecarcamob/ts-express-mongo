import { Document } from "mongoose";
import { IClient } from "./Client";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  created: Date;
  modified: Date;
  clients: [IClient["_id"]];
  status: Boolean;
}
