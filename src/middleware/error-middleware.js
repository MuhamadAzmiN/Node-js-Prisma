import Joi from "joi"; // Mengimpor seluruh modul joi
const { ValidationError } = Joi; // Mengakses ValidationError dari Joi
import { ResponseError } from "../error/response-error.js"; // Gantilah sesuai dengan path yang sesuai

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        return next(); // Melanjutkan ke middleware berikutnya jika tidak ada kesalahan
    }
    if (err instanceof ResponseError) {
        res.status(err.status).json({ errors: err.message }).end();
    } else if (err instanceof ValidationError) {
        // Mengirimkan kesalahan validasi
        res.status(400).json({
            errors: err.details.map(detail => detail.message), // Menggunakan details untuk mendapatkan pesan kesalahan
        });
    } else {    
        res.status(500).json({ errors: err.message });
    }
};

export { errorMiddleware };
