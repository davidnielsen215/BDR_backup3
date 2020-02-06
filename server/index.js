const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const sgMail = require('@sendgrid/mail')
const cors = require('cors')
const PORT = process.env.PORT || 5001;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors())
sgMail.setApiKey(process.env.API_KEY)

app.get('/send-email', (req,res) => {
    
    //Get Variables from query string in the search bar
    const { recipient, sender, topic, text } = req.query; 

    //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text: text,
    }

    //Send Email
    sgMail.send(msg)
    .then((msg) => console.log('email sent'));
});

//connect to db
const db = require('./config/keys').mongoURI
mongoose.Promise = global.Promise;
mongoose.connect(db,
    {useNewUrlParser: true, useUnifiedTopology: true},  // helps get rid of deprecation warnings
    (err) => {
        if (err) throw err;
        console.log("Connected to the database");
    }
);

app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use("/api/subscription", require("./routes/subscription"));
app.use("/api/profile", require("./routes/profile"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`);
});
