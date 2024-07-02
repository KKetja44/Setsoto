const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const managersRouter = require("../routes/staff/managerRouter");
const residentsRouter = require("../routes/residents/residentRouter");
const app = express();

//MIDDLEWARES
app.use(morgan("dev")); // I added this, might not be neccessary. stilll have to test
app.use(express.json()); // pass incoming json data

//ROUTES

//admin express route
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/managers", managersRouter);
app.use("/api/v1/residents", residentsRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
