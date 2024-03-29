// import password-validator
const passwordValidator = require('password-validator');

// Create new schema 
const passwordSchema = new passwordValidator();

// schema rules
passwordSchema
    .is().min(5)                                    // Minimum length 5
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Check if schema is respected, return error if not
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({error : ` The password is not strong enough ${passwordSchema.validate('req.body.password', {list: true})} `})
    }
}

