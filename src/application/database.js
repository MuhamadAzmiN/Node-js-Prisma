import { PrismaClient } from "@prisma/client";
import { logger } from './logging.js';


export const prismaClient = new PrismaClient({
    log: [  
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
    ]
});

// Event listeners untuk logging
prismaClient.$on('error', (e) => {
    logger.error(e); // Menggunakan logger untuk mencatat kesalahan
});

prismaClient.$on('warn', (e) => {
    logger.warn(e); // Menggunakan logger untuk mencatat peringatan
});

prismaClient.$on('info', (e) => {
    logger.info(e); // Menggunakan logger untuk mencatat informasi
});

// Mengganti 'query' dengan 'info' atau menambahkan level kustom
prismaClient.$on('query', (e) => {
    logger.info(e); // Menggunakan info untuk mencatat query
});


