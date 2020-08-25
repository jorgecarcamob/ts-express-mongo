import { Schema, model } from "mongoose";
import { IClient } from "../interfaces/Client";

const ClientSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  modified: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default model<IClient>("Client", ClientSchema, "client");
