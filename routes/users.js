const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/googleOAuth')
.then(function(result){
  console.log('connected to mongodb cluster named googleOAuth')
})
.catch(function(err){
  console.log(err)
})

var userSchema = mongoose.Schema({
  email: String,
  name: String,
})


module.exports = mongoose.model('users', userSchema)

