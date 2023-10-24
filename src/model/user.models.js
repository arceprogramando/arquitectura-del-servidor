import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'user';

const roleType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PREMIUM: 'PREMIUM',
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
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
  carts: {
    type: [
      {
        cart: {
          type: mongoose.Types.ObjectId,
          ref: 'carts',
        },
      },
    ],
    default: [],
  },
  passwordResetRequestAt: {
    type: Date,
    default: null,
  },
  last_connection: {
    type: Date,
  },
});

userSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model(collectionName, userSchema);

export default UserModel;
