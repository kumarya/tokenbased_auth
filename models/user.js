const mongoose = require("mongoose")
mongoose.Promise = require('bluebird');

const bcrypt = require("bcrypt-nodejs")


const Schema = mongoose.Schema

//define model

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:String
})


//bcrypt

userSchema.pre('save', function(next){
    const User = this
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            console.log(err)
        }
        
        bcrypt.hash(User.password, salt, null, function(err, hash){
            if(err) {return next(err)}
            User.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){return callback(err)}
        callback(null, isMatch)
    })
}

//create model 
const User = mongoose.model('User', userSchema)

//export the model
module.exports = User
