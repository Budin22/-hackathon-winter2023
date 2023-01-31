import mongoose, { Document } from "mongoose";

type TStatus = "no-status" | "complete" | "pending";

export type TTask = Document & {
  text: string;
  date: string;
  users: Array<string>;
  status: TStatus;
};

const schema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: true,
  },
});

export default schema;
