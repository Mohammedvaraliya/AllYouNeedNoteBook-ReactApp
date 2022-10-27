const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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

    // Check whether the user with the email exists already
    let user = await User.findOne({ email: req.body.email });
    
    if (user){
        return res.status(400).json({error: 'Sorry a user with this email already exists'})
    }

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    })
    
    // .then(user => res.json(user))
    // .catch(err => { console.log(err), res.json
    //     ({ error: 'Please enter a unique value for email', message: err.message }) });
    res.json(user);
})

module.exports = router