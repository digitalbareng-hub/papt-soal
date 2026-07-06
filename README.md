# Simulasi CAT Ujian PPAT 2026

Aplikasi ini sudah direbuild dari ZIP `materi PPAT.zip` yang berisi materi organisasi ATR/BPN, hukum pertanahan nasional, hak tanah dan pendaftaran tanah, peraturan jabatan PPAT, pembuatan akta PPAT, kode etik IPPAT, PMPJ, honorarium, magang, dan pelaksanaan ujian PPAT.

## Prinsip versi ini

- Bank soal lama tidak lagi dipakai.
- `questions.js` hanya meneruskan data dari `bank.js`.
- `materials-2024.js` dan `materials-regulasi.js` dikosongkan agar tidak mencampur soal lama.
- Simulasi tetap mengikuti format CAT: 20 soal sulit, 30 soal mudah, 50 soal sangat mudah.
- Skor mengikuti bobot: sulit +3.500000 / -0.677777, mudah +2.333333 / -0.333333, sangat mudah +1.000000 / -0.133333, kosong 0.
- Mode LMS tetap tersedia untuk latihan per modul dan pembahasan langsung.

## Deploy Vercel

Vercel biasanya otomatis redeploy setelah push ke branch `main`. Jika belum berubah, buka dashboard Vercel lalu klik `Redeploy`.
