# 📘 Panduan Kustomisasi Portofolio

Website ini sudah bersih & siap pakai. Berikut cara editnya:

## 1. Ganti Foto Profil 📸
- Siapkan foto asli Anda.
- Ganti namanya jadi `profile.jpg`.
- Masukkan ke folder: `public/`.
- (Hapus/timpa file lama jika ada).

## 2. Edit Konten (Text & Skill) 📝
- **Data Skill & Project**: Edit file `src/data.js`.
- **Nama & Intro**: Edit file `src/App.jsx` (Cari teks "Muhamad Aryakusuma").

## 3. Ganti Warna & Desain 🎨
- **Warna Background (Aurora)**:
  Buka `src/App.jsx`, cari `<Aurora colorStops={[...]}>`. Ganti kode warna hex-nya.
- **Warna Teks Mengkilap**:
  Buka `src/App.jsx`, cari `<ShinyText ... />`.

## 4. Jalankan Web 🚀
- Ketik `npm run dev` di terminal untuk melihat perubahan secara langsung.
- Ketik `npm run build` jika sudah selesai dan ingin di-publish.

---
*Dibuat khusus untuk Muhamad Aryakusuma*
