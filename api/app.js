import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoute.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { Job } from "./models/jobSchema.js";
import transactionRoutes from "./routes/transactionRoutes.js"

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: 'http://localhost:5173',
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.post('/chapa-callback', async (req, res) => {
  try {
      const job = await Job.findOne(); // Use findOne() instead of find() to get a single document
      if (job) {
          job.paid = true;
          await job.save(); // Save the changes to the database
          console.log('Payment status updated for job:');
          console.log(job);
          res.status(200).json({ message: 'Payment status updated successfully' });
      } else {
          console.error('Job not found for transaction reference:');
          res.status(404).json({ error: 'Job not found' });
      }
  } catch (error) {
      console.error('Error updating payment status for job:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use('/transactions', transactionRoutes);
app.use('/api/v1/pin', pinRoutes);


dbConnection();
app.use(errorMiddleware);

export default app;
