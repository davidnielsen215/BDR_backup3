const express = require("express");
const subscriptionRouter = express.Router();
const Subscription = require("../models/subscription");

subscriptionRouter.get("/", (req, res) => {
    Subscription.find({ user: req.user._id }, (err, subscription) => {
        if (err) return res.status(500).send(err);
        return res.send(subscription);
    });
});

subscriptionRouter.post("/", (req, res) => {
    const subscription = new Subscription(req.body);
    subscription.user = req.user._id;
    subscription.save(function (err, newSubscription) {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newSubscription);
    });
});

subscriptionRouter.get("/:subscriptionId", (req, res) => {
    Subscription.findOne({ _id: req.params.subcriptionId, user: req.user._id }, (err, subscription) => {
        if (err) return res.status(500).send(err);
        if (!subscription) return res.status(404).send("No subscription found.");
        return res.send(subscription);
    });
});

subscriptionRouter.put("/:subscriptionId", (req, res) => {
    Subscription.findOneAndUpdate(
        { _id: req.params.subscriptionId, user: req.user._id },
        req.body,
        { new: true },
        (err, subscription) => {
            if (err) return res.status(500).send(err);
            return res.send(subscription);
        }
    );
});

subscriptionRouter.delete("/:subscriptionId", (req, res) => {
    Subscription.findOneAndRemove({ _id: req.params.subscriptionId, user: req.user._id }, (err, subscription) => {
        if (err) return res.status(500).send(err);
        return res.send(subscription);
    });
});

module.exports = subscriptionRouter;
