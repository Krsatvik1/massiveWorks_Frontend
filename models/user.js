
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Add any other fields you want to store for each user
});

// A method to compare the hashed password
UserSchema.methods.comparePassword = function(password, cb) {
  console.log(password, this.password)
  return cb(bcrypt.compareSync(password, this.password));
};

// Pre-save hook to hash the password
UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);