const User = require("../models/User");
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers



    if (!token) {
        return res.status(403).send({ err: "unauthorised" })
    }

    // Token data
    let result;

    try {
        result = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        console.log(error)
        return res.status(403).send({ err: "unauthorised12" })
    }
    // console.log(token)

    const { _id: id } = result;

    const user = await User.findById(id).select(['-password'])

    if (!user) {
        return res.status(404).send({ err: "user not exists" })
    }

    if (token !== user.token) {
        return res.status(403).send({ err: "unauthorised" })
    }

    req.user = { id }

    next()
}

module.exports = { authMiddleware }