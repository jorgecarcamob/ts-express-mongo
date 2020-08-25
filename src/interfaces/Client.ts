import { Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  phone: string;
  created: Date;
  modified: Date;
  status: Boolean;
}
