const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const forum = require("./routes/api/forum");
const wallet = require("./routes/api/wallet");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); //wat?
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoBD
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/forum", forum);
app.use("/api/wallet", wallet);

//the process.env is for heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
