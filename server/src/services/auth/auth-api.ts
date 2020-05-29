import express from "express";
import { verifyToken } from "./token-functions";
import { signin } from "./signin-functions";
import { SysUsers, getUserByUuid } from "../sys-users/users-api";

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/api/auth/user", (req, res) => {
  try {
    if (!req.get("x-access-token")) {
      return res.status(500).send({
        message: "Token missing",
      });
    }
    const token: string = req.get("x-access-token")!;
    if (!verifyToken(token)) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    const undecodedToken = verifyToken(token);
    if (!(typeof undecodedToken === "object" && "uuid" in undecodedToken)) {
      return res.status(500).send({
        message: "Broken token",
      });
    }
    getUserByUuid((undecodedToken as { uuid: string }).uuid).then((user) => {
      res.send(user);
    });
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/api/auth/signin", (req, res) => {
  console.log("signin request");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  signin(req, res);
});

export = authRouter;
