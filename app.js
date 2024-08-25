const express = require('express');
const connectToDatabase = require('./services/databaseConnection');
const cors = require('cors'); // Import cors
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE',]
}));

connectToDatabase();

app.get("/", (req, res) => {
    return res.send("All ARE OK!");
});

const userRoute = require("./routes/user");
const otpRoute = require("./routes/otp");
app.use("/api/user", userRoute);
app.use("/api/otp", otpRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Site is running on port ${PORT} ✔`);
});
