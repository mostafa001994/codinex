// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "mysql",
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   dbCredentials: {
//     // host: "localhost",
//     // user: "root",
//     // password: "",
//     // database: "mydb",
//     url : process.env.DRIZZLE_DATABASE_URL!,
//   },
// });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});

