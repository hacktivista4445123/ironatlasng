import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 peticiones
    standardHeaders: true,
    legacyHeaders: false,
    message: "IP_BLOCKED: Exceso de peticiones detectado."
});

export default [
    helmet(),
    limiter,
    (req, res, next) => {
        // Bloqueo de cabeceras peligrosas
        res.removeHeader("X-Powered-By");
        next();
    }
];
