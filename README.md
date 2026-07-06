# PPAT CAT Tryout dan LMS

Sistem latihan tryout CAT dan LMS belajar untuk persiapan ujian PPAT 2026.

Aplikasi ini berupa web statis multi-file sehingga bisa langsung dijalankan di Vercel, GitHub Pages, atau server static biasa.

## Fitur

- Bank soal dikurasi dari bahan latihan PPAT yang diunggah: peraturan jabatan PPAT, akta PPAT, kode etik, organisasi IPPAT, dan contoh pembahasan.
- Paket tryout selalu acak dengan komposisi tetap:
  - 20 soal Sulit
  - 30 soal Mudah
  - 50 soal Sangat Mudah
- Skor berbobot:
  - Sulit: benar +3.500000, salah -0.677777, kosong 0.
  - Mudah: benar +2.333333, salah -0.333333, kosong 0.
  - Sangat Mudah: benar +1.000000, salah -0.133333, kosong 0.
- Mode `Tryout CAT`: timer, navigasi nomor soal, ragu-ragu, laporan skor, review pembahasan, export hasil JSON.
- Mode `LMS Belajar`: pilih modul, jawab soal, langsung muncul kunci dan penjelasan mengapa jawaban benar.

## Menjalankan Lokal

```bash
python3 -m http.server 5173
```

Lalu buka `http://localhost:5173`.

## Deploy Vercel

1. Import repo ini di Vercel.
2. Framework Preset: `Other`.
3. Build Command: kosongkan.
4. Output Directory: kosongkan atau isi `.`.
5. Deploy.

## GitHub Pages

Aktifkan dari `Settings > Pages`, pilih sumber `GitHub Actions`, lalu jalankan workflow Pages.

## Catatan

Bank soal bawaan adalah simulasi edukatif, bukan bocoran soal resmi. Soal bisa terus dikembangkan dari hasil riset dan kisi-kisi terbaru.