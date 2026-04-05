import express from "express"
import dotenv from "dotenv"
import aliadosRoutes from "./routes/aliados.routes.js"
import security from "./middlewares/security.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(security)

app.use("/api/aliados", aliadosRoutes)

app.listen(process.env.PORT || 3000)
