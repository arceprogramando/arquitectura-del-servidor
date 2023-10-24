import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'user';

const roleType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PREMIUM: 'PREMIUM',
};

const documentSchema = new mongoose.Schema({
  name: String,
  reference: String,
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: Object.values(roleType),
    default: 'USER',
  },
  uploadedDocuments: {
    identificationImage: {
      type: Boolean,
      default: false,
    },
    residenceImage: {
      type: Boolean,
      default: false,
    },
    accountStatusImage: {
      type: Boolean,
      default: false,
    },
  },
  carts: [
    {
      cart: {
        type: mongoose.Types.ObjectId,
        ref: 'carts',
      },
    },
  ],
  passwordResetRequestAt: {
    type: Date,
    default: null,
  },
  last_connection: Date,
  documents: [documentSchema],
});

userSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model(collectionName, userSchema);

export default UserModel;
