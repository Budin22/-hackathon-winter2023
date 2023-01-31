import mongoose, { Document } from "mongoose";
export type TUser = Document & {
  email: string;
  password: string;
};

const schema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

export default mongoose.model<TUser>("users", schema);
