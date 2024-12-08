import server from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Express Server started on PORT: ${PORT}`)
);
