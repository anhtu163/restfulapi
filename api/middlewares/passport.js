const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

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

// passport.use(new FacebookStrategy({
//     clientID: "385118689034200",
//     clientSecret: "huynhanh",
//     callbackURL: ""
// },
//     function(accessToken, refreshToken, profile,done){
//         UserModel.findOrCreate(...UserModel,function(err,user){
//             if(err) {return done(err);}
//             done(null,user)
//         })
//     }
// ))

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
    return UserModel.findOne(jwtPayload._id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
}