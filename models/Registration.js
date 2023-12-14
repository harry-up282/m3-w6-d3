const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// registrationSchema.pre('save', async function (next) {
//   // Hash the password only if it's modified or a new registration
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = mongoose.model('Registration', registrationSchema);