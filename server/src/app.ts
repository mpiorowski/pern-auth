import { port } from "./config/app-config";

import express from "express";
const app = express();

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.json("test");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
