import mongoose, { Schema, Document } from 'mongoose';

export interface IShow extends Document {
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  rating: string;
  videoUrl: string;
}

const ShowSchema: Schema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: String, required: true },
  videoUrl: { type: String, required: true }
});

export default mongoose.model<IShow>('Show', ShowSchema);