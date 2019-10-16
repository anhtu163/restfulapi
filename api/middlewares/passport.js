const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

/*passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

        
        return UserModel.findOne({username, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));*/
module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
const localOpts = {
    usernameField: 'username',
};
const localStrategy = new LocalStrategy(localOpts, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({
            username
        });
        if (!user) {
            // console.log("Sai o day")
            return done(null, false);
        } else if (! bcrypt.compareSync(password,user.password)) { 
            //user.authenticateUser(password) ||
           // console.log("Sai o duoi nay: "+bcrypt.compareSync(password,user.password))
            return done(null, false);
        }
        require.user = user
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'huynhanh'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
}