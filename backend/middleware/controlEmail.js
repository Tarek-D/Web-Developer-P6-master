const validator = require("validator");

module.exports = (req, res, next) => {
  const { email } = req.body;
// check with validator if email 
  if (validator.isEmail(email)) {
    next();
  } else {
    return res.status(400).json({ error: `The email " ${email} " is not valid` });
  }
};
