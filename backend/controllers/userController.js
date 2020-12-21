const Users = require('../models/userModel')
const brycpt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const userController = {
    register: async (req,res) => {
        try {
            const {email, password, name} = req.body;
            const user = await Users.findOne({email: email})
            if (!user) {
                const passwordCrypted = await brycpt.hash(password, 10)
                const registerUser = new Users({
                    email: email,
                    password: passwordCrypted,
                    name: name
                })
                await registerUser.save().then(() => res.json('User added'))
                .catch(err => res.status(400).json('Error' + err))
            } else {
                return res.status(400).json({msg: "user already exists with this email"})
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }, 
    login: async (req,res) => {
        try {
            const {email,password} = req.body
            console.log(email,password)
            const user = await Users.findOne({email: email})
            if (user) {
                const checkCrypt = await brycpt.compare(password, user.password)
                if (!checkCrypt) {
                    return res.status(400).json({msg: "please check your credentials!"})
                }
                const payload = {id: user._id, name: user.username}
                const jwtToken = jsonwebtoken.sign(payload, process.env.SECRET, {expiresIn: "1d"})
                res.json({jwtToken})
            } else {
                return res.status(400).json({msg: "please check your credentials!"})
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({msg: error.message})
        }
    }, 
    checkJWT: (req,res) => {
        try {
            const token = req.header("Authroization")
            if (!token) {
                return res.send(false)
            }

            jsonwebtoken.verify(toekn, process.env.SECRET, async (err,decoded) => {
                if (err) {
                    return res.send(false)
                }
                const user = await User.findById(decoded.id)
                if (!user) {
                    return res.send(false)
                }
                return res.send(true)
            })
        } catch (error) {
            return res.status(500).jason({msg: error.message})
        }
    } 
}


module.exports = userController