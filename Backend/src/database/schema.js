import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

//Table uusgeh bichiglel eniig drizzle-r generate hiij SQL ruu horvuulne
export const users = pgTable("users", {
  id: serial("id").primaryKey(), //id ni field, serial gdg ni +1-r nemegddeg bichiglel, primaryKey ni table deer bgaa record bolgonig unique bolgoj bgaa.
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  userId: integer("userId"), // integer deer length zaaj blohgui, zaahaar bolvol oor arga hereglej blno.
  amount: integer("amount"),
  description: varchar("description", { length: 256 }),
  categoryId: integer("categoryId"),
  type: varchar("type", { length: 256 }),
  date: varchar("date", { length: 256 }),
  time: varchar("time", { length: 256 }),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  icon: varchar("icon", { length: 256 }),
  color: varchar("color", { length: 256 }),
  userId: integer("userId"),
});

export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

export const recordsRelations = relations(records, ({ one }) => ({
  //one to one or many to one
  user: one(users, {
    // 1 record ni 1 user-tei l holbootoi bn
    fields: [records.userId], //record-n userId fieldeer holbogdono
    references: [users.id], //users.id-tai holbogdono
  }),
  category: one(categories, {
    // 1 record ni 1 category-toi l holbootoi bn
    fields: [records.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  records: many(records), //category olon recordstoi hamaaraltai baij bolno
}));
