const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Public klasörünü statik dosya olarak aç
app.use(express.static(path.join(__dirname)));

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Menü sayfası
app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname,"menu.html"));
});

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} üzerinde çalışıyor`);
});
