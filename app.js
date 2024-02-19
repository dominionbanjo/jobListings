require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const accountsRouter = require("./routes/accounts");
const jobsRouter = require("./routes/jobs");
const internshipsRouter = require("./routes/internships");
const scholarshipsRouter = require("./routes/scholarships");

const express = require("express");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/accounts", accountsRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/internships", internshipsRouter);
app.use("/api/v1/scholarships", scholarshipsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
  } catch (error) {
    console.log({ error: error });
  }
};

start();
