const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// define validation lib
const Joi = require('joi');

// name, email, photo, password, passwordconfirm
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    photo: String,
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        select: false,
        required: true,
        minlength: 8,
    }
});

// function validate all fields
function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        passwordConfirm: Joi.string().min(8).required().valid(Joi.ref('password')).options({
            language: {
                any: {
                    allowOnly: '!!Passwords do not match',
                }
            }
        })
    };

    return Joi.validate(user, schema);
}
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'User');

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;