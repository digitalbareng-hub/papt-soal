# PPAT CAT Tryout

Sistem latihan tryout CAT untuk persiapan ujian PPAT 2026.

Aplikasi ini berupa web statis single-file sehingga bisa langsung dijalankan dari browser dan cocok untuk GitHub Pages.

## Fitur

- 100 soal pilihan ganda.
- Komposisi kategori sesuai tabel penilaian: 20 Sulit, 30 Mudah, 50 Sangat Mudah.
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

Aktifkan dari `Settings > Pages`, pilih sumber `Deploy from a branch`, branch `main`, folder `/root`.

## Catatan

Bank soal bawaan adalah simulasi edukatif, bukan bocoran soal resmi. Soal bisa dikembangkan lagi dari hasil riset dan kisi-kisi terbaru.