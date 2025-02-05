import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Le code est requis." });
  }

  try {
    // Remplace l'URL par celle fournie par ISL pour générer le fichier
    const islUrl = `https://www.islonline.com/fr/fr/join/#${code}`;

    // Télécharge le fichier depuis l'API ISL
    const response = await axios.get(islUrl, { responseType: "stream" });

    // Définit le chemin temporaire pour sauvegarder le fichier
    const tempPath = path.join(process.cwd(), `isl-client-${code}.exe`);

    // Sauvegarde le fichier temporairement
    const writer = fs.createWriteStream(tempPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      // Envoie le fichier au client
      res.setHeader("Content-Disposition", `attachment; filename="isl-client-${code}.exe"`);
      res.setHeader("Content-Type", "application/octet-stream");

      const fileStream = fs.createReadStream(tempPath);
      fileStream.pipe(res);

      fileStream.on("close", () => {
        // Supprime le fichier temporaire après envoi
        fs.unlinkSync(tempPath);
      });
    });

    writer.on("error", () => {
      res.status(500).json({ error: "Erreur lors de la génération du fichier." });
    });
  } catch (error) {
    console.error("Erreur avec l'API ISL :");
    console.error(error);
    res.status(500).json({ error: "Impossible de récupérer le fichier." });
  }
}
