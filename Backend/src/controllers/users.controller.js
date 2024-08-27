import { db } from "../database/index.js";
import { users } from "../database/schema.js";

export const getUsers = async (req, res) => {
  const users = await db.query.users.findMany({
    with: {
      records: true,
    },
  });

  res.json(users);
};

export const getMe = async (req, res) => {
  //User uuriin medeellee avah function
  try {
    const user = req.user;
    console.log(user);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db
    .insert(users)
    .values({ name, email, password })
    .returning();

  res.json(user);
};
