import { exec } from "child_process";
import fs from "fs";
import path from "path";

const pages = [
  "https://solution-logique.vercel.app",
  "https://solution-logique.vercel.app/logiciels",
  "https://solution-logique.vercel.app/ebpcomptabilite",
  "https://solution-logique.vercel.app/ebpgestionco",
  "https://solution-logique.vercel.app/ebpbatiment",
  "https://solution-logique.vercel.app/nosServices",
  "https://solution-logique.vercel.app/informatique",
  "https://solution-logique.vercel.app/telecom",
  "https://solution-logique.vercel.app/securite",
  "https://solution-logique.vercel.app/telemaintenance",
  "https://solution-logique.vercel.app/contact",
];

const currentDate = new Date().toISOString().split("T")[0];

const resultsDir = path.resolve(`./audit/results-${currentDate}`);

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

pages.forEach((url) => {
  const pageName = url
    .replace("https://solution-logique.vercel.app", "")
    .replace(/^\//, "") 
    .replace(/\//g, "-") || "home"

  const sanitizedFileName = `report-${pageName}.html`;
  const output = path.join(resultsDir, sanitizedFileName);

  console.log(`Auditing ${url}...`);

  exec(
    `lighthouse ${url} --output html --output-path ${output} --preset=desktop --chrome-flags="--headless"`,
    (error) => {
      if (error) {
        console.error(`Error auditing ${url}: ${error.message}`);
        return;
      }
      console.log(`Audit completed for ${url}. Report saved as ${output}`);
    }
  );
});
