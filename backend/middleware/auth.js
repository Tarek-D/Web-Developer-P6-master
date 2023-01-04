const jwt = require('jsonwebtoken');
require('dotenv').config({ path : './config/.env' });
 
module.exports = (req, res, next) => {
   try {
    // extracts the JWT from the Authorization header in the request. 
    // The JWT is stored in the Bearer authorization scheme, 
    // so it needs to be split from the Bearer prefix.
       const token = req.headers.authorization.split(' ')[1];
       // verifies the JWT using the verify method of the jsonwebtoken module. 
       // The second argument is the secret key used to sign the JWT, 
       // which is stored in the SECRET_TOKEN environment variable. 
       // If the JWT is valid, the method returns the decoded token.
       const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next(); // calls the next middleware function in the chain.
   } catch(error) {
       res.status(401).json({ error });
   }
};