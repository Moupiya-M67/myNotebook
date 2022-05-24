const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchUser')

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
        const authtoken = jwt.sign(data, JWT_SECRET); //JWT Token
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2 : Authenticate a user using: POST "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //let success = false;
    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ error: "Please login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            //success = false;
            res.status(400).json({error: "Please login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //success = true;
        res.json({ authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});

//ROUTE 3 : Get logged in user details using: POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exists
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});

module.exports = router;