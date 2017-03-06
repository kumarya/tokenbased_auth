const jwt = require("jwt-simple")
const config = require("../config")

const User = require("../models/user")

function tokenForUser(user){
    const timestamp =new Date().getTime()
    return jwt.encode({sub:user.id, iat: timestamp}, config.secret)
}

exports.signin = function(req, res, next){
    res.send({token:tokenForUser(req.user)})
}
exports.signup = function(req, res, next){
    
    //
    //console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    const newUser = {email:email, password:password}
    if(!email || !password){
        return res.status(422).send({error:'you must provide email and password'})
    }
    
    User.findOne({email:email}, function(err, existingUser){
        if(err){
            console.log(err)
        }
        if(existingUser){
            return res.status(422).send({error: 'email in use'})
        }
        const newlyUser = new User(newUser)
        newlyUser.save(function(err, createdUser){
            if(err){
                console.log(err)
            }
            res.json({token:tokenForUser(User)})
            //console.log(createdUser)
        })
    })
    
    
}