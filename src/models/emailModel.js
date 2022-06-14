
const mongoose = require('../db/mongoose');
const validator = require("validator");


const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "A user must have an email"],
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Please enter a valid email!");
          }
        },
      },
    
}, {
    timestamps: true
})


const Email = mongoose.model('Email', emailSchema);

module.exports = Email;