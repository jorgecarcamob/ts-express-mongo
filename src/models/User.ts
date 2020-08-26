import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/User";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
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
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
});

export default model<IUser>("User", UserSchema, "user");
