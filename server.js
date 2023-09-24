import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//to read cookies
app.use(cookieParser());

import connectDb from "./connectDb/connectDB.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Routers
import jobsRouter from "./routes/jobRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import { validateTest } from "./middleware/validationMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

//app.use("/api/v1/jobs", authenticateUser);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
//login and register Router
app.use("/api/v1/auth", authRouter);
//get-current user router
app.use("/api/v1/users", authenticateUser, userRouter);

//set up in between url, and controller,our validator will be sitting on top of controller,
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "./public/index.html"));
});

app.get("/api/v1/test", (req, res) => {
  res.send({ msg: `hello hero` });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not-found" });
});

//only for synchronous errors
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log(`Error in starting server`);
  }
};

start();
