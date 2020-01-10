const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

userSchema.methods.encryptPassword = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(5), null);
//userSchema.methods.validatePassword = (pw) => bcrypt.compareSync(pw,this.password); //I don 't  know why it doesn't work

const User = mongoose.model('user', userSchema);

module.exports = User;