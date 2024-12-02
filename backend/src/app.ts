import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/apis/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export default app;
