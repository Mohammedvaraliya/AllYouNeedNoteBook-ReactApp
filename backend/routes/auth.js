const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Creating a User using : POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Check whether the user with the email exists already
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exists' })
        }

        const salt = bcrypt.genSalt(10, function(err, salt) {});
        const secPass = bcrypt.hashSync(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            date: req.body.date
        })

        res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured");
    }
})

module.exports = router