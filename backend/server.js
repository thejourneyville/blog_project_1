require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware logger
app.use(express.json());

// CORS
app.use(cors({
    origin: process.env.WHITELIST_URL, credentials: true 
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// enable cookies
app.use(cookieParser());

// connect to DB
mongoose
    .set("strictQuery", false)
    .connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(
                "\n<<< connected to MongoDB Atlas DB blogmvp and listening on port",
                process.env.PORT,
                ">>>\n"
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
