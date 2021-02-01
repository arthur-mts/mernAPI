import { Schema, model, Document } from 'mongoose';

export interface AccountShape extends Document {
  name: string;
}

const AccountSchema = new Schema({
  name: {type: String, required: true, unique: true}
},{ versionKey: false});


export default model<AccountShape>("Account", AccountSchema);
