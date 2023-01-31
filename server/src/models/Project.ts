import mongoose, { Document } from "mongoose";
export type TProject = Document & {
  projectName: string;
  date: string;
  author: string;
};

const schema = new mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.model<TProject>("projects", schema);
