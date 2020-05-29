import { port } from "./config/app-config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./services/auth/auth-api";

const app = express();
app.use(
  cors()
);
app.use(express.json());

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// routes
app.use(authRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("welcome home");
});


// start the Express server
app.listen(port, () => {
  console.log("server started at http://localhost:" + port);
});

