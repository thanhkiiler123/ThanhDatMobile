const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const initWebRoute = require("./route/web");
const initAPIRoute = require("./route/api");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "secret" }));

configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);
// app.use(notFound);
// app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
