const { validationResult } = require("express-validator");
const { User } = require("../models/User");

const registerController = async (req, res) => {

    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const user = await User.create(req.body);
        res.json(user)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }

}

module.exports = { registerController }