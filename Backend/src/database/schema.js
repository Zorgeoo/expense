import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

//Table uusgeh bichiglel eniig drizzle-r generate hiij SQL ruu horvuulne
export const users = pgTable("users", {
  id: serial("id").primaryKey(), //id ni field, serial gdg ni +1-r nemegddeg bichiglel, primaryKey ni table deer bgaa record bolgonig unique bolgoj bgaa.
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  userId: integer("userId"), // integer deer length zaaj blohgui, zaahaar bolvol oor arga hereglej blno.
  amount: integer("amount"),
  description: varchar("description", { length: 256 }),
  categoryId: integer("categoryId"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
