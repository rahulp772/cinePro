const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  },
  name: {
    type: String,
    required: [true, "Please provide name of user"],
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    validate: [validator.isEmail, "Please provide valid email address!"],
  },
  phone: {
    type: Number,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password can not be blank"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password can not be blank"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password not match!",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypt password before save
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// delete fields from response
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// compare user password while login
userSchema.methods.comparePassword = async function (
  bodyPassword,
  userPassword
) {
  return await bcrypt.compare(bodyPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
