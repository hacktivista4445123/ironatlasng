import express from "express"
import { getAliados } from "../controllers/aliados.controller.js"

const router = express.Router()

router.get("/", getAliados)

export default router
