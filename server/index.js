const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const { readdirSync } = require("fs");
const cors = require("cors");
require("dotenv").config();

//app
const app = express();

//db
mongoose
  .connect(
    process.env.REACT_APP_MONGO_URI ?? "mongodb://localhost:27017/papersetter",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("common"));
app.use(cors());

//routes midleware
app.use("/", function (req, res) {
  res.send("Hello World");
});
// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
const auth = require("./routes/auth");
const subject = require("./routes/subject");
app.use("/api", auth);
app.use("/api", subject);
//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is Running", port);
});
