const fs = require("fs");
const path = require("path");
const db = require("./db");

async function creeazaTabele() {
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, "sql", "create-tables.sql"), "utf8");
    await db.none(schemaSql);
    console.log("✔️ Toate tabelele au fost create.");
  } catch (err) {
    console.error("Eroare la creare tabele:", err);
  } finally {
    process.exit();
  }
}

creeazaTabele();
