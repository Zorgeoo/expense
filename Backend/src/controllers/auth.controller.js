import { and, eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { users } from "../database/schema.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Find user matching email and password
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.password, password)),
  });
  console.log(user);

  if (!user) {
    // If user not found, respond with 401 status code
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create token for the authenticated user
  const token = jwt.sign(
    {
      username: user.name,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET // Secret key for signing the JWT
  );

  // Respond with token and user details
  return res.status(200).json({
    token,
    user: {
      username: user.name,
      email: user.email,
      id: user.id,
    },
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body; //REQ-s medeellee avna.

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (user) return res.status(400).json({ message: "User already exists" }); //Hervee adil medeeleltei hariltsag ch oldoh ym bol.

  const newUser = await db
    .insert(users)
    .values({ name, email, password })
    .returning();

  res.json(newUser); //Shine useree RES-r butsaana.
};
