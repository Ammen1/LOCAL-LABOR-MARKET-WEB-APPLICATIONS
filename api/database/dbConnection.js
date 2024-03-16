import mongoose from "mongoose";

const MONGO="mongodb+srv://amenguda:1234@cluster0.gbjwmvi.mongodb.net/Road"

export const dbConnection = () => {
  mongoose
    .connect(MONGO, {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
