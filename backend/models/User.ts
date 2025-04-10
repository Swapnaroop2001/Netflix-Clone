import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'allshows' }]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'allshows' }]
});

export default mongoose.model<IUser>('user', UserSchema);