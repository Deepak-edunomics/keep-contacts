const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Models
const User = require('../model/user')

//Config
const keys = require('../config/keys')


module.exports = {
    userRegister: async (req, res, next) => {
        try {
            let errors = {}
            const { name, email, password, phone_number } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
                phone_number
            })
            await newUser.save()
            const { _id } = newUser
            const payload = {
                _id, name, phone_number, email
            }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        message: "New user created successfully",
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({ message: `Error in userRegister ${err.message}` })
        }
    },
    userLogin: async (req, res, next) => {
        try {
            let errors = {}
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors)
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const { _id, name, phone_number } = user
            const payload = {
                _id, name, phone_number, email
            }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        message: "User logged in successfully",
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    },
    updateUser: async (req, res, next) => {
        try {
            let errors = {}
            const { id } = req.params
            const { name, email, phone_number } = req.body
            const user = await User.findById(id)
            if (!user) {
                errors.user = "User not found"
                return res.status(404).json(errors)
            }
            if (name) {
                user.name = name
            }
            if (email) {
                user.email = email
            }
            if (phone_number) {
                user.phone_number = phone_number
            }
            await user.save()
            return res.status(200).json({
                success: true,
                message: "user updated successfully",
                result: user
            })
        }
        catch (err) {
            console.log("Error in updateUser", err.message)
            return res.status(400).json({ message: `Error in updateUser ${err.message}` })
        }
    },
    getUsers: async (req, res, next) => {
        try {
            let errors = {}
            const {_id} = req.user
            const users = await User.find({ created_by: _id }).sort({ created_at: -1 })
            return res.status(200).json({
                success: true,
                message: `${users.length} users found `,
                result: users
            })
        }
        catch (err) {
            console.log("Error in getusers", err.message)
            return res.status(400).json({ message: `Error in getusers ${err.message}` })
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            let errors = {}
            const {id} = req.params
            const user = await User.findByIdAndRemove(id)
            if (!user) {
                errors.user = "No user found"
                return res.status(404).json(errors)
            }
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                result: user
            })
        }
        catch (err) {
            console.log("Error in deleteUser", err.message)
            return res.status(400).json({ message: `Error in deleteUser ${err.message}` })
        }
    },
    addUser: async (req, res, next) => {
        try {
            let errors = {}
            const { _id } = req.user
            const { name, email, password, phone_number } = req.body
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const user = await new User({
                name,
                email,
                password: hashedPassword,
                phone_number,
                created_by: _id
            })
            await user.save()
            return res.status(200).json({
                success: true,
                message: "user added successfully",
                result: user
            })
        }
        catch (err) {
            console.log("Error in addUser", err.message)
            return res.status(400).json({ message: `Error in addUser ${err.message}` })
        }
    }
}


