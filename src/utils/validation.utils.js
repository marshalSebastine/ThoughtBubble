
const isValidPassword = (password) => {    
    /* regex for atleast on small letter , capital letter,
     a digit and a special character.
     password must be  atleast 8 characters long */
    let passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    return passwdRegex.test(password)
}

module.exports = isValidPassword 