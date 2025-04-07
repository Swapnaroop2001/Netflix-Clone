import mongoose, { Schema, Document } from 'mongoose';

export interface IShow extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  poster: string;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: object;
  lastupdated: Date;
  year: number;
  imdb: object;
  countries: string[];
  type: string;
  tomatoes: object;
  num_mflix_comments: number;
}

const ShowSchema: Schema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  plot: { type: String, required: true },
  genres: { type: [String], required: true },
  runtime: { type: Number, required: true },
  cast: { type: [String], required: true },
  fullplot: { type: String, required: true },
  languages: { type: [String], required: true },
  released: { type: Date, required: true },
  directors: { type: [String], required: true },
  rated: { type: String, required: true },
  awards: { type: Object, required: true },
  lastupdated: { type: Date, required: true },
  year: { type: Number, required: true },
  imdb: { type: Object, required: true },
  countries: { type: [String], required: true },
  type: { type: String, required: true },
  tomatoes: { type: Object, required: true },
  num_mflix_comments: { type: Number, required: true }
});

export default mongoose.model<IShow>('allshows', ShowSchema);
