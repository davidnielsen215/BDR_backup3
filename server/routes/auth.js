const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res) => {
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) return res.status(500).send({success: false, err});
        if (existingUser !== null) {
            return res.status(400).send({success: false, err: "That username already exists!"});
        }
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) return res.status(500).send({success: false, err});
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.status(201).send({success: true, user: user.withoutPassword(), token});
        });
    });
});

authRouter.post("/login", (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.status(403).send({success: false, message: "Email or password are incorrect"})
        }
        user.checkPassword(req.body.password, (err, match) => {
            if (err) return res.status(500).send(err);
            if (!match) return res.status(401).send({ success: false, message: "Username or password are incorrect" });
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.send({ token: token, user: user.withoutPassword(), success: true })
        });
    });
});

authRouter.put('/validate', (req, res) => {
    User.findOneAndUpdate({name: req.body.username}, {isValidated: true}, {useFindAndModify: false})
    .then(user => res.send(user)) 
    .then(console.log('succesfully validated customer'))
    .catch(err => res.status(404).json({success: false})).then(console.log('failed to validate'))
})

module.exports = authRouter;
