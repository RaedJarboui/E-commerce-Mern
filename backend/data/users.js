const bcrypt = require('bcryptjs')
const users = [
    {
        name:'Raed',
        email:'raed@gmail.com',
        password:bcrypt.hashSync('raed',10),
        isAdmin:true
    }, {
        name:'Ahmed',
        email:'ahmed@gmail.com',
        password: bcrypt.hashSync('ahmed',10),
        isAdmin:false
    }
]
module.exports = users