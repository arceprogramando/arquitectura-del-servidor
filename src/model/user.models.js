import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'user';

const roleType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PUBLIC: 'PUBLIC',
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
  cart: {
    type: mongoose.Types.ObjectId,
    ref: 'carts',
  },
  notes: {
    type: [
      {
        note: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'notas',
        },
      },
    ],
    default: [],
  },
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function (next) {
  this.populate('notes.note');
  next();
});

const UserModel = mongoose.model(collectionName, userSchema);

export default UserModel;
