const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';
module.exports = {
    
    issueToken(user){
        return jwt.sign({email : user.email , firstname : user.firstname, role : user.role}, SECRET_KEY);
    },
    verifyToken(token, cbk){
        jwt.verify(token, SECRET_KEY , cbk);
    },
}