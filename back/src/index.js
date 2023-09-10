const express = require("express");
const cors = require("cors");
const db = require("./db");
const config = require("./shared/config");
const handleError = require("./shared/errors/handle");
//
const UserRoute = require("./modules/users/_api");
const GuideRoute = require("./modules/guide/_api");
const UserGuideRoute = require("./modules/user_guide/_api");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(UserRoute);
app.use(GuideRoute);
app.use(UserGuideRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
