const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../config/db");

function jwtfunc(format) {
  if (format.operation === "sign") {
    let token = jwt.sign(
      { email: format.email, password: format.password },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );
    return token;
  } else if (format.operation === "verify") {
    let data = jwt.verify(format.token, process.env.JWT_SECRET);
    console.log("JWT: ", data);
    return data;
  } else {
    return "Invalid operation";
  }
}

async function hashPassword(password) {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.verifyUser = async (req, res, next) => {
  const cookies = req.body.token;
  if (cookies) {
    const format = { operation: "verify", token: cookies };
    const data = jwtfunc(format);
    const user = await userModel.findOne({ email: data.email });
    if (user) {
      req.user = user;
    } else {
      res.status(404).send("User not found");
    }
  }
  next();
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).send("User not found");
  }
  let valid = await bcrypt.compare(password, user.password);
  if (valid) {
    const format = { email, password, operation: "sign" };
    const userCookie = jwtfunc(format);
    res.status(200).send({ user, userCookie });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

module.exports.register = async (req, res, next) => {
  const { username, lastName, email, password, mobileNumber } = req.body;
  const hash = await hashPassword(password);

  const format = { email, password, operation: "sign" };
  const userCookie = jwtfunc(format);
  const user = await userModel.create({
    username,
    lastName,
    email,
    password: hash,
    mobileNumber,
  });
  res.status(200).send({ user, userCookie });
};
