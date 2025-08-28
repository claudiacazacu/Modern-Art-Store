const fs = require("fs");
const path = require("path");
const db = require("./db");

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, "sql", "seed.sql"), "utf8");
    await db.none(sql);
    console.log("✅ Datele de test au fost inserate.");
  } catch (err) {
    console.error("❌ Eroare la seed:", err);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
