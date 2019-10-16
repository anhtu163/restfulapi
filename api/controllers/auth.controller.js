const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    authLogin : (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err); 
            }
            if(!user){
                return res.status(400).json({
                    message: info ? info.message: 'Login failed',
                    user   : user
                });
            }
           req.logIn(user, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed son web token with the contents of user object and return it in the response
               const token = jwt.sign({
                   username: user.username,
                   password: user.password,
                   name: user.name,
                   phone: user.phone
               }, 'huynhanh');
               return res.json(token);
            });
        })(req, res,next);
    }
}