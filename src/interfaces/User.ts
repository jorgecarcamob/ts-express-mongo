import { Document } from "mongoose";
import { IClient } from "./Client";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  created: Date;
  modified: Date;
  posts: [IClient["_id"]];
  status: Boolean;
}
