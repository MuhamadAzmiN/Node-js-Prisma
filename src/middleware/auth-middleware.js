import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Kecualikan Swagger dan endpoint tertentu dari otentikasi
    if (req.path.startsWith("/api-docs")) {
      return next(); // Swagger tidak memerlukan otentikasi
    }

    // Ambil token dari header Authorization, hapus kata 'Bearer' jika ada
    const token = req.get("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ errors: "Unauthorized" });
    }

    // Cek apakah token UUID ada di database
    const user = await prismaClient.user.findFirst({
      where: { token: token }, // Asumsikan token adalah UUID
    });

    if (!user) {
      return res.status(401).json({ errors: "Unauthorized" });
    }

    req.user = user; // Menyimpan data pengguna ke dalam `req` untuk digunakan di handler berikutnya
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
};
