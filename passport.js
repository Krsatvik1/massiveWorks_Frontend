const passport    = require('passport');
const passportJWT = require("passport-jwt");
const User = require("./models/User");
var JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const ExtractJWT = passportJWT.ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, cb) => {
        console.log(User.findOne({email : username}))
        //Assume there is a DB module pproviding a global UserModel
        return User.findOne({email : username})
            .then(user => {
                console.log('username: '+username)
                console.log('password: '+password)
                
                user.comparePassword(password, (isMatch,err) => {
                    console.log('isMatch: '+isMatch)
                    if (isMatch) {
                        return cb(false, user, {
                            message: 'Logged In Successfully'
                        });
                    }else{
                        return cb(null, false, {message: 'Incorrect email or password.'});
                    }
                })
            })
            .catch(err => {
                return cb(err);
            });
    }
));
const cookieExtractor = req => {
    let jwt = null 

    if (req && req.cookies) {
        jwt = req.cookies['jwt']
        console.log('jwt: '+jwt)
    }

    return jwt
}
passport.use(new JwtCookieComboStrategy({
        secretOrPublicKey   : process.env.JWT_SECRET
    },
    function (payload, cb) {
        console.log('payload: ')
        console.log(payload)
        //find the user in db if needed
        return User.findById(payload.user_id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));