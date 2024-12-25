const express = require("express");
const MongoConnect = require("./utils/db").MongoConnect;
const route = require("./route");
const app = express();

app.use(express.json());
app.use(route);

MongoConnect(() => {
  app.listen(8000, () => console.log("server is running 8000"));
});
