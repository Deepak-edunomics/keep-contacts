const express = require('express')
const router = express.Router()
const passport = require('passport')


const { userLogin, userRegister, getUsers, updateUser,
    deleteUser, 
    addUser} = require('../controller/userController')



//USER REGISTER
router.post('/user', userRegister)

// USER LOGIN
router.post('/session', userLogin)

//ADD USER
router.post('/users', passport.authenticate('jwt', { session: false }), addUser)

//GET ALL ADDED USER
router.get('/users', passport.authenticate('jwt', { session: false }), getUsers)

//UPDATE ADDED USER
router.put('/users/:id', passport.authenticate('jwt', { session: false }), updateUser)

//DELETE ADDED USER
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), deleteUser)

//Logout Route
// i didnt create logout route, beacuse i am not storing token in database, i am doing logout thing from
// frontend side, by deleting token from localStorage and nullifying user.



module.exports = router