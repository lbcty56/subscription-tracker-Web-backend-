import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToMongoDB from "./db/mongoDB.js";
import errorMiddleware from "./Middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./Middleware/arcjet.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);

// api/v1/auth/sign-up or sign-in or sign-out
app.use("/api/v1/auth", authRouter);
// api/v1/users
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running in http://localhost:${PORT}`
  );
  await connectToMongoDB();
});

export default app;
