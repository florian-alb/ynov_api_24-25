import app from "./app";
import prisma from "./db";

const PORT = process.env.PORT;

prisma
  .$connect()
  .then(async () => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
