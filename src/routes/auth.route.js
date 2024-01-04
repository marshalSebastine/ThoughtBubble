const express = require('express');
const validator = require("email-validator");



const router = express.Router();
// considered the case of login with email
router.post('/login',(req,res) => {

    let {email,password} = req.body

    if (!email  || !password 
        || typeof(email) != "string" 
        || typeof(password) != "string"
        || !validator.validate(email)){
        res.statusCode = 422
        res.end()
    }

    // check for entry in db 

    res.status = 200
    res.end()

})

module.exports = router