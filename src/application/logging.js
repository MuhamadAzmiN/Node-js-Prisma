import winston from "winston";

const logger = winston.createLogger({
    level: "warn",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

// Pastikan ini adalah ekspor default
export default logger; 
