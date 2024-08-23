const { readJson, saveJson } = require("../utils");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

// const login = async (req, res) => {
//   const { email, password } = req.body; //Front-end-s irsen req-s email,password 2oo avna.
//   const users = readJson("users.json"); //Path-g zaaj ugnu.

//   const user = users.find(
//     (user) => user.email === email && user.password === password // Req-s irsen email, passwordtai user bga esehig shalgana.
//   );

//   if (!user) {
//     res.status(401).json({ message: "Invalid credentials" }); //Amjiltgui bolson bol butsaah message.
//   } else {
//     res.status(200).json({ message: "Login successful" }); //Amjilttai bolson bol butsaah message.

//     const token = jwt.sign(
//       {
//         username: user.username, //Payload-nd oroh zuilsiin medeelliig oruulna.
//         email: user.email,
//         id: user.id,
//       },
//       process.env.JWT_SECRET //nuuts ugee nuuj bgaa. utils/.env-d nuusan.
//     );

//     res.json({
//       token,
//       user: {
//         username: user.username, //Result butsaahdaa hariltsagchin mdeeleltei TOKEN hariu shidne.
//         email: user.email,
//         id: user.id,
//       },
//     });
//   }
// };
const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body
  const users = readJson("users.json"); // Read users from JSON file

  // Find user matching email and password
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    // If user not found, respond with 401 status code
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create token for the authenticated user
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET // Secret key for signing the JWT
  );

  // Respond with token and user details
  return res.status(200).json({
    token,
    user: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body; //REQ-s medeellee avna.
  const users = readJson("users.json"); //Path-g zaaj ugnu.
  console.log(req.body);

  const user = users.find((user) => user.email === email); //Req-r irsen medeeleltei hariltsagch bga esehig shalgana.

  if (user) return res.status(400).json({ message: "User already exists" }); //Hervee adil medeeleltei hariltsag ch oldoh ym bol.

  const newUser = {
    //Oldohgui bol shine hariltsagch uusgene.
    id: v4(),
    username,
    email,
    password,
  };

  users.push(newUser); //Shine usereee users-ruugee nemeed

  saveJson("users.json", users); //Usersee hadgalah

  res.json(newUser); //Shine useree RES-r butsaana.
};

module.exports = { login, register };
