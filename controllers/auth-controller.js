const jwt = require("jsonwebtoken");
const fs = require("fs");
const authToken = require("../models/auth-token");
const uuid = require("uuid").v4();

checkExpiry = (token) => {
  try {
    const publicKey = fs.readFileSync("public.pem", "utf-8");

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err.message);
      } else {
        console.log("Token decoded successfully:", decoded);
      }
    });
  } catch (error) {
    if (error.message === "jwt expired") {
      return false;
    }
  }
};

createJwtToken = () => {
  try {
    const privateKey = fs.readFileSync("private.pem", "utf-8");
    const subject = uuid;
    const keyId = uuid.split("-").at(-1);
    let payload = {
      scope: "get:data_anon",
    };
    const token = jwt.sign(token, privateKey, {
      issuer: "",
      audience: "",
      subject: subject + "@client",
      algorithm: "",
      expiresIn: "1d",
      header: { kid: keyId },
    });
    return token;
  } catch (error) {
    return error;
  }
};
