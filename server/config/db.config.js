const mongoose = require("mongoose");

const db = () => {
    mongoose
        .connect(
            "mongodb+srv://jawad:JawaD-991@cluster0.uabpnpd.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = db;
