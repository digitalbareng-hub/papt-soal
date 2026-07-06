# PPAT CAT Tryout

Sistem latihan tryout CAT berbasis bank soal acak untuk persiapan ujian PPAT 2026.

Aplikasi ini berupa web statis single-file sehingga bisa langsung dijalankan dari browser dan cocok untuk GitHub Pages.

## Fitur

- Bank soal lebih besar dari 100 item.
- Setiap mulai tryout atau refresh sesi, aplikasi mengambil paket 100 soal secara acak.
- Komposisi paket tetap sesuai tabel penilaian: 20 Sulit, 30 Mudah, 50 Sangat Mudah.
- Skor berbobot:
  - Sulit: benar +3.500000, salah -0.677777, kosong 0.
  - Mudah: benar +2.333333, salah -0.333333, kosong 0.
  - Sangat Mudah: benar +1.000000, salah -0.133333, kosong 0.
- Timer ujian.
- Navigasi nomor soal.
- Tandai ragu-ragu.
- Laporan skor akhir per kategori.
- Review pembahasan.
- Export hasil tryout JSON.

## Menjalankan Lokal

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 5173
```

Lalu buka `http://localhost:5173`.

## GitHub Pages

Aktifkan dari `Settings > Pages`, pilih sumber `GitHub Actions`, lalu jalankan workflow Pages.

## Catatan

Bank soal bawaan adalah simulasi edukatif, bukan bocoran soal resmi. Soal bisa terus dikembangkan dari hasil riset dan kisi-kisi terbaru.