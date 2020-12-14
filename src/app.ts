import * as express from "express"
import * as compression from "compression"
import * as helmet from "helmet"
import * as morgan from "morgan"
import * as cors from "cors"
import Router from "./Routers/index"
import { swaggerSpec } from "./Module/swagger";
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = process.env.PORT || 3000
const http = require("http")
const server = http.createServer(app)
require("dotenv").config()
app.use(morgan("dev"))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "30mb" }))

app.use("/", Router)
// serve swagger
app.get("/",(req,res)=>{
	res.send("테스트")
})
app.get("/swagger.json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
var options = {
    swaggerOptions: {
      url: `http://unitaemin.run.goorm.io/safecall/swagger.json`
    }
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(null, options));

server.listen(3000, () => {
  console.log(`http://localhost:${3000} OnOn`)
})
