require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
// routes files
const users = require("./routes/usersRoots");
const portfolio = require("./routes/portfolioRoots");
const industries = require("./routes/industriesRoots");
const photos = require("./routes/photosRoots");
const services = require("./routes/servicesRoots");
const tech_stack = require("./routes/techStackRoots");

// middleware

app.use(cors());
app.use(bodyParser.json());

// pathes
app.use("/", users);
app.use("/", portfolio);
app.use("/", industries);
app.use("/", photos);
app.use("/", services);
app.use("/", tech_stack);

// port no
const PORT = process.env.SERVER_PORT;

connectDB.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`server started ${PORT}`);
    });
  }
});
