const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserByID){
    const authenticator = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (!user) { // with this email no user exists
             return done(null, false); 
        }
        try {
            if(await bcrypt.compare(password, user.password)) {// user is valid
                return done(null, user);
            }
            else{// passwords didn't match
                return done(null, false);
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticator ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
            done(null, getUserByID(id))
      });
}

module.exports = initialize;
