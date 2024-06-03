const passport = require('passport');
const Person = require('./models/person');
const LocalStratergy = require('passport-local').Strategy;

passport.use(new LocalStratergy(async (User,password,done) =>{
    try{
        // console.log('Recived credentials', User,password);
        const user = await Person.findOne({username:User});
        if(!user)
            return done(null,false,{messge:'Incorrect username'});

        const isPasswordMatch = user.password === password ? true:false;

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'})
        }
    }catch(err){
        return done(err);
    }
}))

// Export
module.exports = passport