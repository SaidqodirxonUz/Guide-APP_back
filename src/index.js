const express = require("express");
const db = require("./db");
const config = require("./shared/config");

const app = express();

app.use(express.json());

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
