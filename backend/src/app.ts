import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/apis/index.js";
import cron from "node-cron";
import prismaClient from "./lib/db.js";
import cors from "cors";
import http from "http";

const app = express();

/* Cron Job */
cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    await prismaClient.room.updateMany({
      where: {
        isActive: true,
        expiresAt: { lt: now },
      },
      data: { isActive: false },
    });
    console.log("Checked for expired rooms and updated status.");
  } catch (error) {
    console.error("Error updating expired rooms:", error);
  }
});

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

const server = http.createServer(app);

export default server;
