import cors from "cors";
import express from "express";
import { port } from "./config/app-config";
import authRouter from "./services/auth/auth-api";
import loginRouter from "./services/auth/login-api";
import registerRouter from "./services/auth/register-api";

const app = express();
app.use(cors());
app.use(express.json());

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// routes
app.use(authRouter);
app.use(loginRouter);
app.use(registerRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("welcome home");
});

// start the Express server
app.listen(port, () => {
  console.log("server started at http://localhost:" + port);
});
