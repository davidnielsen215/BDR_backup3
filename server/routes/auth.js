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
            return res.status(200).send({success: true, user: user.withoutPassword(), token});
        });
    });
});

authRouter.post("/login", (req, res) => {
    // console.log(req.body)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.status(403).send({success: false, message: "Email or password are incorrect"})
        }
        if (!user.activated){
            return res.status(398).send({success: false, message: "You must verify your email first", })
            .send(console.log('email verification required'))
        }
        user.checkPassword(req.body.password, (err, match) => {
            if (err) return res.status(500).send(err);
            if (!match) return res.status(401).send({ success: false, message: "Email or password are incorrect" });
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.send({ token: token, user: user.withoutPassword(), success: true })
        });
    });
});

authRouter.post("/validate", (req, res) => {
    console.log(req.query)
    // User.findOne({username: req.query.username.toLowerCase()}, (err, user) => {
    //     if (err) return res.status(500).send(err);
    //     if (!user) {
    //         return res.status(403).send({success: false, message: "Email or password are incorrect"})
    //     }
    User.findOneAndUpdate({secretToken: req.query.token, username: req.query.username.toLowerCase()}, {activated: true}, {useFindAndModify: false}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.status(403).send({success: false, message: "Email or password are incorrect"})
        }
        if (!req.query.token) return res.status(500).send(err)
        return res.status(200).send({user, success: true})
    })
    })
// })


module.exports = authRouter;
