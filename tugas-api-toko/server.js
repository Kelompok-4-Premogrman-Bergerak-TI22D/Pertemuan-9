const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// KEAMANAN: CORS - Hanya izinkan Ionic (Port 8100)
const corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// DATABASE SIMULASI (Array)
let dataBarang = [
  { id: 1, nama_barang: 'Beras 5kg', harga: 65000 },
  { id: 2, nama_barang: 'Minyak Goreng 2L', harga: 35000 }
];

// ========== ENDPOINT GET (Ambil Semua Barang) ==========
app.get('/api/barang', (req, res) => {
  console.log('📥 Request GET - Mengambil data barang');
  res.json(dataBarang);
});

// ========== ENDPOINT POST (Tambah Barang Baru) ==========
app.post('/api/barang', (req, res) => {
  const barangBaru = req.body;
  
  // Validasi input
  if (!barangBaru.nama_barang || !barangBaru.harga) {
    return res.status(400).json({ 
      pesan: 'Gagal! Nama barang dan harga harus diisi' 
    });
  }

  // Generate ID unik
  barangBaru.id = Date.now();
  
  // Simpan ke database
  dataBarang.push(barangBaru);
  
  console.log('✅ Data baru berhasil ditambahkan:', barangBaru);
  console.log('📦 Total barang sekarang:', dataBarang.length);
  
  res.status(201).json({ 
    pesan: 'Barang berhasil ditambahkan!', 
    data: barangBaru 
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server Toko berjalan di http://localhost:${PORT}`);
  console.log(`🔒 CORS: Hanya menerima request dari http://localhost:8100`);
});