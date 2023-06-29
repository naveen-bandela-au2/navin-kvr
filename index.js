require("dotenv").config();
require('./src/db/conn');
const express = require("express");
var cors = require('cors')
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
