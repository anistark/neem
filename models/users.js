var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taxi');

// grab the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

// create a schema
var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  phone: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')){
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;

    var that = this;
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(that.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            that.password = hash;
            next();
        });
    });
  }else{
    next();
  }

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
