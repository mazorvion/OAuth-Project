var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var userModel = require('./users.js')
var dotenv = require('dotenv')
dotenv.config()

passport.use(
  new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'email', 'profile' ]
},async function verify(issuer, profile, cb) {
  // creating logic to verify the user

  try{

    let existingUser = await userModel.findOne({email: profile.emails[0].value})

    if(existingUser){
      return cb(null, existingUser) // first param is for error
    }else{
      let newUser = await userModel.create({name: profile.displayName, email: profile.emails[0].value})
      return cb(null, newUser)
    }

  }catch(err){
    console.log(err)
    return err;
  }

}));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  if (req.user){
    res.render('index', { title: 'Express' });

  }else{
    res.redirect('/login')

  }

});

router.get('/login', function(req, res, next) {

  if(!req.user){
    res.render('login');

  }else{
    res.redirect('/')
  }
  

});


router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));



module.exports = router;
