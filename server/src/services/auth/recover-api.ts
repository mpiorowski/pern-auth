import bcrypt from "bcrypt";
import express from "express";
import randomNumber from "random-number-csprng";
import { saltRounds, tokenExpirationTime } from "../../config/app-config";
import { sendEmail } from "../../config/mail-config";
import { recoveryCodeMessage } from "../../config/mail-messages";
import { createToken, findTokenByEmail, Token } from "../../db/tokens-db";
import { getUserByUserNameOrEmail, SysUser, updatePassword } from "../../db/users-db";

const recoverRouter = express.Router();
recoverRouter.use(express.json());

recoverRouter.post("/api/auth/recover", async (req, res) => {
  console.log(Date() + " :recover request");
  try {
    if (!req.body || !req.body.userNameOrEmail) {
      return res.status(500).send({
        message: "Bad request",
      });
    }

    const user = await getUserByUserNameOrEmail(req.body.userNameOrEmail);
    if (user.length < 1) {
      return res.status(404).send({
        header: "Username or email does not exsist",
        message: "The given username or email does not exsist. Please try another.",
        code: 1,
      });
    }

    const code = await randomNumber(100000, 999999);
    const token = {
      data: { code: code },
      type: "recovery",
      email: user[0].userEmail,
      expire: new Date(Date.now() + tokenExpirationTime * 1000).toISOString(),
    };

    const createdToken: Token[] = await createToken(token);
    if (createdToken.length > 0) {
      // send email with recovery code
      await sendEmail(user[0].userEmail, "Recovery code", recoveryCodeMessage(code));
      return res.status(200).send({ message: "Recovery code sent succesfully" });
    }
    return res.status(500).send({
      message: "Recovery code creation failed, something went wrong",
    });
  } catch (error) {
    console.error(error);
    // TODO - dont send this message in prod
    return res.status(500).send({ message: error.message });
  }
});

recoverRouter.post("/api/auth/recover/code", async (req, res) => {
  console.log(Date.now() + " :recover request with code");
  try {
    if (!req.body || !req.body.code || !req.body.userNameOrEmail || !req.body.userPassword) {
      return res.status(404).send({ message: "Bad request" });
    }

    const user: SysUser[] = await getUserByUserNameOrEmail(req.body.userNameOrEmail);
    if (user.length <= 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = await findTokenByEmail(user[0].userEmail);
    if (token.length < 0 && new Date(token[0].expire) <= new Date(Date.now())) {
      return res.status(404).send({ message: "Token has expired", code: 1 });
    }

    if (req.body.code != token[0].data.code) {
      return res.status(500).send({
        message: "Wrong verification code",
        code: 2,
      });
    }

    const pass = await bcrypt.hash(req.body.userPassword, saltRounds);

    await updatePassword(user[0].userEmail, pass);
    return res.status(200).send({ message: "Password updated succesfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export = recoverRouter;
