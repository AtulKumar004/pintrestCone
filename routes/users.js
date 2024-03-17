const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/pinterest-clone');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    posts: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    userProfile: {
      type : String,
    },
    phoneNo: {
        type: Number,
        unique: true,
        validate: {
            validator: function(v) {
                // Regular expression to validate phone number format
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
        // Add more validation for password strength if needed
        validate: {
            validator: function(v) {
                // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: props => `Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.`
        }
    }
});

// Pre-save hook to hash the password before saving to the database

// Define a pre-save middleware function for the user schema
userSchema.pre('save', async function(next) {
  try {
      // Check if the password field of the user document has been modified
      if (!this.isModified('password')) {
          // If not modified, skip password hashing and proceed
          return next();
      }

      // Generate a salt asynchronously with a cost factor of 10
      const salt = await bcrypt.genSalt(10);

      // Hash the user's password using the generated salt
      const hash = await bcrypt.hash(this.password, salt);

      // Assign the hashed password back to the 'password' field of the user document
      this.password = hash;

      // Proceed to the next middleware or save operation
      next();
  } catch (error) {
      // If an error occurs during password hashing, pass it to the error handler middleware
      next(error);
  }
});


module.exports = mongoose.model('User', userSchema);
