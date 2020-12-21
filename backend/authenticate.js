const jsonwebtoken = require('jsonwebtoken')

const authenticate = (req,res,next) => {
    try {
        const token = req.header("Authorization")
        if (!token)  {
            return res.status(400).json({msg: "Cannot Authenticate"})
        }
        jsonwebtoken.verify(token,process.env.SECRET, (err, user) => {
            if (err) {
              return res.status(400).json({msg: "Cannot Authenticate"})
            }

            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authenticate