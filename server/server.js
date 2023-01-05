const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { readdirSync } = require("fs");
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
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(cors());

//routes midleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is Running", port);
});
