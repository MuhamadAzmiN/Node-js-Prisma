import { web } from "./application/web";
import { logger } from "./application/logging";

// Menggunakan variabel lingkungan untuk port
const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    logger.error(`Failed to start server: ${err.message}`);
});
