//package imports
const express = require("express");
const dotenv = require("dotenv").config()
const color = require("colors");
const morgan = require("morgan");
const cors = require("cors")
const express_async_errors = require("express-async-errors")

//file imports
const connectDB = require("./config/dbConnection");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes")
const jobsRoutes = require("./routes/jobsRoutes")


// app initialization
const app = express()

//Database Connection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// port selectection
const port  = process.env.PORT || 6000;

//methods
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);
//validation middleware
app.use(errorMiddleware);

// activating port
app.listen(port, ()=>{
    console.log(`Port running in ${process.env.DEV_MODE} mode at ${port}`.bgCyan);
})