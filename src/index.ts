import app from "./app";
import prisma from "./db";

const PORT = process.env.PORT;

prisma
  .$connect()
  .then(async () => {
    console.log(process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined");
    }

    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
