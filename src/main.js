import { web } from "./application/web.js";
import { logger } from "./application/logging.js";


const PORT = process.env.PORT || 3026;

web.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
})