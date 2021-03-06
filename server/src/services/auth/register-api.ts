import bcrypt from "bcrypt";
import express from "express";
import randomNumber from "random-number-csprng";
import { ROLE_USER, saltRounds, tokenExpirationTime } from "../../config/app-config";
import { sendEmail } from "../../config/mail-config";
import { registerCodeMessage } from "../../config/mail-messages";
import { createToken, findTokenByEmail, Token } from "../../db/tokens-db";
import { createUser, getUserByUserEmail, getUserByUserName, SysUser } from "../../db/users-db";

const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.post("/api/auth/register", async (req, res) => {
  console.log(Date.now() + " :register request");
  try {
    if (!req.body || !req.body.userName || !req.body.userEmail || !req.body.userPassword) {
      return res.status(500).send({
        message: "Bad request",
      });
    }
    const checkUserName = await getUserByUserName(req.body.userName);
    if (checkUserName.length > 0) {
      return res.status(404).send({
        header: "Username already taken",
        message: "The given username is already taken. Please try another.",
        code: 1,
      });
    }
    const checkUserEmail = await getUserByUserEmail(req.body.userEmail);
    if (checkUserEmail.length > 0) {
      return res.status(404).send({
        header: "Email already taken",
        message: "The given email is already taken. Please try another.",
        code: 2,
      });
    }

    const pass = await bcrypt.hash(req.body.userPassword, saltRounds);
    const user: SysUser = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: pass,
      userRole: ROLE_USER,
    };

    const code = await randomNumber(100000, 999999);
    const data = {
      code: code,
      user: user,
    };

    const token = {
      data: data,
      type: "register",
      email: user.userEmail,
      expire: new Date(Date.now() + tokenExpirationTime * 1000).toISOString(),
    };

    const created: Token[] = await createToken(token);
    if (created.length > 0) {
      // send email with register code
      await sendEmail(user.userEmail, "Verification code", registerCodeMessage(code));
      return res.status(200).send({ message: "Verification code sent succesfully" });
    }
    return res.status(500).send({
      message: "Verification code creation failed, something went wrong",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

registerRouter.post("/api/auth/register/code", async (req, res) => {
  console.log(Date.now() + " :register request with code");
  try {
    if (!req.body || !req.body.code || !req.body.userEmail) {
      return res.status(404).send({ message: "Bad request" });
    }
    const token = await findTokenByEmail(req.body.userEmail);
    if (token.length < 0 && new Date(token[0].expire) <= new Date(Date.now())) {
      return res.status(404).send({ message: "Token has expired", code: 1 });
    }
    if (req.body.code != token[0].data.code) {
      return res.status(500).send({
        message: "Wrong verification code",
        code: 2,
      });
    }
    if (!token[0].data.user || !token[0].data.user.userName || !token[0].data.user.userEmail) {
      return res.status(404).send({ message: "Wrong token" });
    }
    // TODO - during register check if there is a token with username or email, so nobody can steal it while registring
    const checkUserName = await getUserByUserName(token[0].data.user.userName);
    if (checkUserName.length > 0) {
      return res.status(404).send({ message: "Username already taken" });
    }
    const checkUserEmail = await getUserByUserEmail(token[0].data.user.userEmail  );
    if (checkUserEmail.length > 0) {
      return res.status(404).send({ message: "Email already taken" });
    }
    const user: SysUser = token[0].data.user;
    const created = await createUser(user);
    if (created.length > 0) {
      return res.status(200).send({ message: "User succesfully added" });
    }
    return res.status(500).send({
      message: "User not added, something went wrong",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export = registerRouter;
