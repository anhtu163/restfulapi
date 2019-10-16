const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    authLogin : (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) {
                return next(err); 
            }
            if(!user){
                return res.status(400).json({
                    message: info ? info.message: 'Login failed',
                    user   : user
                });
            }
           req.logIn(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed son web token with the contents of user object and return it in the response
               //const token = jwt.sign(user, 'huynhanh');
               return res.json(user);
            });
        })(req, res,next);
    }
}