import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import { config } from "../config";
import { connectToDatabase } from "../db/mongodb";
import healthcheckRoutes from "./routes/healthcheck";
import currencyRoutes from "./routes/currency.router";

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());
connectToDatabase().then(() => {
    // use routes
    app.use(healthcheckRoutes.routes());
    app.use(currencyRoutes.routes());

    app.listen(PORT, async () => {
        console.log(`Server listening on port: ${PORT}`);
      })
      .on("error", err => {
        console.error(err);
      });
}).catch((error: Error) => {
    console.error("Database connection failed.", error)
    process.exit();
})