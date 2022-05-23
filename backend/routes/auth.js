const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
const JWT_SECRET = 'MySignatureJwtToken';

//ROUTE 1 : Create a user using: POST "api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 4 characters').isLength({ min: 4 })
], async (req, res) => {
    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    //Check whether the user with this email exists
    try {


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, this email already exists" });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //JWT Token
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;