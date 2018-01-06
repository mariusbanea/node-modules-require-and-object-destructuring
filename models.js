
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  fullname: String,
  username: String,
  password: String
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    fullname: this.fullname,
    password: this.password,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
