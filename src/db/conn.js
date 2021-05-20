const mongoose = require("mongoose");

// Creating database
mongoose.connect("mongodb://localhost:27017/spark_bank", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful");
}).catch((error) => {
    console.log(error);
})