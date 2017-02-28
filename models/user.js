import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(this.password, salt)
    })
    .then(hash => {
      this.password = hash;
      next();
    });

});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userSchema);