import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  watchlist: string[]; // Array of Show IDs
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'Show' }]
});

export default mongoose.model<IUser>('User', UserSchema);