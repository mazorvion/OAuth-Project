const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vikas:zjQ5yIgLGJW4ZMtl@googleoauth.mgwdgfz.mongodb.net/?retryWrites=true&w=majority')
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

