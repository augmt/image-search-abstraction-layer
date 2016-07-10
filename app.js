"use strict";

const express = require("express");
const expressMongoDB = require("express-mongo-db");
const app = express();

app.use("/search", expressMongoDB(process.env.MONGO_URL));
app.use(require("./routes"));

app.listen(process.env.PORT);
