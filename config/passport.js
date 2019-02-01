const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({usernameField: 'email'}, (email,password,done) =>{
      //Match user to database
      User.findAll({
          where: {email}
      })
        .then(user => {

          if(user.length === 0){

            return done(null,false,{ message: "User not registered."})
          }

          //Match password
          bcrypt.compare(password, user[0].dataValues.uPassword, (err,isMatch) => {
            if(err) throw err;
            if(isMatch){
              return done(null, user);
            }else{
              return done(null, false, { message: 'Password incorrect' });
            }
          })
        })
        .catch(err =>{
          console.log(err);
          return done(null, false, { message: "Error occured while logging in. Please contact admin"});
        })
    })
  );

  //Serialize user for session
  passport.serializeUser(function(user, done) {
    done(null, user[0].dataValues.id);
  });

  //Deserialize user for session
  passport.deserializeUser(function(id, done) {
    User.findByPk(id)
      .then((user) =>{
        done(null, user);
      })
  });
};
