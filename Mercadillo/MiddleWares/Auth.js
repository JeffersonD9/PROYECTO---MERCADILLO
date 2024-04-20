import passport from 'passport'
import { Strategy } from 'passport-local'

passport.use('SignUp', new Strategy({
    usernameField: 'Email',
    passwordField: 'Password'
}, async (Email,Password,done)=>{
    try {
        
    } catch (error) {
        
    }
}))