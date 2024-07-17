import express from "express";
import rateLimit from "express-rate-limit";
import userRoute from "./routes/userRoutes.js";
import recipeRoute from "./routes/recipeRoute.js"

import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController.js";

import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import "dotenv/config";


const app = express();

// Global Middleware

//Set security HTTP Headers
app.use(helmet());
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      ["https://recipee-store.vercel.app", "http://localhost:3000"].indexOf(
        origin
      ) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Prevent XSS attacks

app.use(xss());

// Limit requests from same API

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(cookieParser());

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/recipe", recipeRoute);

app.use(globalErrorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
