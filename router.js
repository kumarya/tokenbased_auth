const Authentication = require("./controllers/authentication")
const passportService = require("./services/passport")
const passport = require("passport")


const requireAuth = passport.authenticate('jwt', {session:false})
const requireSignin = passport.authenticate('local', {session:false})

module.exports = function(app){
    
    
    app.get('/', function(req, res, next){
        res.send('NewER')
    })
    
    app.get('/test', requireAuth, function(req, res){
        res.send('Hi thjere')
    })
    
    
    app.post('/signup', Authentication.signup)
    app.post('/signin', requireSignin, Authentication.signin)

    
}