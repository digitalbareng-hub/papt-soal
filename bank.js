import { HARD_1 } from './bank-hard-1.js';
import { HARD_2 } from './bank-hard-2.js';
import { HARD_3A } from './bank-hard-3a.js';
import { HARD_3B } from './bank-hard-3b.js';
import { HARD_4 } from './bank-hard-4.js';
import { HARD_5A } from './bank-hard-5a.js';
import { HARD_5B } from './bank-hard-5b.js';
import { HARD_5C } from './bank-hard-5c.js';
export const RULES={SULIT:{label:'Sulit',take:20,correct:3.5,wrong:-0.677777},MUDAH:{label:'Mudah',take:30,correct:2.333333,wrong:-0.333333},SANGAT_MUDAH:{label:'Sangat Mudah',take:50,correct:1,wrong:-0.133333}};
const W=['Kode Etik IPPAT','Buku daftar akta','Magang IPPAT','Honorarium PPAT'];
function q(c,m,t,a){return{category:c,module:m,question:t,options:[a,...W],answerIndex:0,explanation:`Jawaban benar: ${a}. Ini diambil dari materi ${m} dan menjadi poin yang sering dijadikan jebakan ujian.`}}
function rows(a){return a.map(([m,t,a])=>q('MUDAH',m,t,a))}
function rowsB(a){return a.map(([m,t,a])=>q('SANGAT_MUDAH',m,t,a))}
const M=[
['Organisasi ATR/BPN','Motto atau nilai layanan ATR/BPN yang sering diuji adalah ...','Melayani, Profesional, Terpercaya.'],
['Organisasi ATR/BPN','BPN didefinisikan sebagai ...','Lembaga Pemerintah Non Kementerian di bidang pertanahan.'],
['Organisasi ATR/BPN','Salah satu unsur organisasi ATR/BPN adalah ...','Ditjen Penetapan Hak dan Pendaftaran Tanah.'],
['Hukum Pertanahan Nasional','Pasal 33 ayat (3) UUD 1945 diarahkan untuk ...','Sebesar-besar kemakmuran rakyat.'],
['Hukum Pertanahan Nasional','UUPA adalah UU Nomor ...','5 Tahun 1960.'],
['Hukum Pertanahan Nasional','Pasal UUPA yang menjadi dasar pendaftaran tanah adalah ...','Pasal 19.'],
['Pendaftaran Tanah','Objek pendaftaran tanah meliputi ...','Hak atas tanah, HPL, tanah wakaf, HMSRS, Hak Tanggungan, dan tanah negara.'],
['Pendaftaran Tanah','Satuan wilayah tata usaha pendaftaran tanah pada umumnya adalah ...','Desa atau kelurahan.'],
['Pendaftaran Tanah','Data fisik tanah berkaitan dengan ...','Letak, batas, luas, dan keterangan fisik objek.'],
['Pendaftaran Tanah','Data yuridis tanah berkaitan dengan ...','Status hukum, pemegang hak, dan beban atas tanah.'],
['Pendaftaran Tanah','Pendaftaran tanah sistematik dilakukan ...','Berdasarkan rencana kerja pada wilayah tertentu.'],
['Pendaftaran Tanah','Pendaftaran tanah sporadik dilakukan ...','Atas permohonan pihak yang berkepentingan.'],
['Pendaftaran Tanah','Surat ukur memuat ...','Data fisik bidang tanah dalam bentuk peta dan uraian.'],
['Pendaftaran Tanah','Tanah wakaf dibuktikan dengan ...','Akta Ikrar Wakaf.'],
['Pendaftaran Tanah','Hak Milik atas satuan rumah susun dibuktikan dengan ...','Akta pemisahan.'],
['Peraturan Jabatan PPAT','Tugas pokok PPAT adalah ...','Membuat akta sebagai dasar perubahan data pendaftaran tanah.'],
['Peraturan Jabatan PPAT','Perbuatan hukum PPAT meliputi, kecuali ...','Pendirian perseroan tanpa objek hak atas tanah.'],
['Peraturan Jabatan PPAT','PPAT diangkat dan diberhentikan oleh ...','Menteri.'],
['Peraturan Jabatan PPAT','Daerah kerja PPAT menurut PP 24/2016 adalah ...','Satu wilayah provinsi.'],
['Peraturan Jabatan PPAT','Permohonan cuti PPAT kurang dari 3 bulan diajukan kepada ...','Kepala Kantor Pertanahan setempat.'],
['Peraturan Jabatan PPAT','Cuti PPAT lebih dari 6 bulan memerlukan persetujuan ...','Menteri.'],
['Pembuatan Akta PPAT','Akta PPAT dibuat dalam bentuk asli sebanyak ...','2 lembar.'],
['Pembuatan Akta PPAT','Nomor urut akta PPAT berulang pada ...','Permulaan tahun takwim.'],
['Pembuatan Akta PPAT','Jumlah saksi minimal dalam pembuatan akta PPAT adalah ...','2 orang.'],
['Pembuatan Akta PPAT','Buku daftar akta PPAT diisi ...','Setiap hari kerja PPAT.'],
['Pembuatan Akta PPAT','Jika tidak ada akta pada hari kerja, buku daftar akta memuat kata ...','Nihil.'],
['Pembuatan Akta PPAT','Laporan bulanan akta PPAT dikirim paling lambat ...','Tanggal 10 bulan berikutnya.'],
['Kode Etik IPPAT','Kode Etik IPPAT disahkan melalui ...','Kepmen ATR/Kepala BPN No. 112/KEP-4.1/IV/2017.'],
['Kode Etik IPPAT','Onzetting berarti ...','Pemecatan dari keanggotaan IPPAT.'],
['PMPJ dan Honorarium','Permen ATR/BPN No. 21 Tahun 2022 mengatur ...','Penerapan Prinsip Mengenali Pengguna Jasa bagi PPAT.']
];
const B=[
['Organisasi ATR/BPN','Kementerian ATR menyelenggarakan urusan pemerintahan di bidang ...','Pertanahan dan suburusan tata ruang.'],['Organisasi ATR/BPN','BPN dipimpin oleh ...','Kepala.'],['Organisasi ATR/BPN','Permen ATR/BPN No. 6 Tahun 2025 mengatur ...','Organisasi dan tata kerja ATR/BPN.'],['Organisasi ATR/BPN','Salah satu Ditjen di ATR/BPN adalah ...','Ditjen Tata Ruang.'],['Hukum Pertanahan Nasional','UUPA diundangkan pada tahun ...','1960.'],['Hukum Pertanahan Nasional','Hak Milik adalah hak turun-temurun, terkuat, dan ...','Terpenuh.'],['Hukum Pertanahan Nasional','Semua hak atas tanah mempunyai fungsi ...','Sosial.'],['Hukum Pertanahan Nasional','Hak menguasai negara diatur dalam UUPA Pasal ...','2.'],['Pendaftaran Tanah','Dasar hukum utama pendaftaran tanah adalah PP Nomor ...','24 Tahun 1997.'],['Pendaftaran Tanah','PTSL adalah singkatan dari ...','Pendaftaran Tanah Sistematis Lengkap.'],['Pendaftaran Tanah','Sertipikat adalah ...','Surat tanda bukti hak.'],['Pendaftaran Tanah','Buku tanah memuat ...','Data fisik dan data yuridis.'],['Pendaftaran Tanah','Roya adalah ...','Penghapusan Hak Tanggungan.'],['Pendaftaran Tanah','Hak Tanggungan dibuktikan dengan ...','APHT.'],['Pendaftaran Tanah','Tanah wakaf dibuktikan dengan ...','AIW.'],['Pendaftaran Tanah','Hak Pengelolaan biasa disingkat ...','HPL.'],['Pendaftaran Tanah','Hak Guna Bangunan biasa disingkat ...','HGB.'],['Pendaftaran Tanah','Hak Guna Usaha biasa disingkat ...','HGU.'],['Peraturan Jabatan PPAT','PPAT adalah pejabat umum yang membuat akta otentik tertentu mengenai ...','Hak atas tanah atau HMSRS.'],['Peraturan Jabatan PPAT','Produk utama PPAT adalah ...','Akta PPAT.'],['Peraturan Jabatan PPAT','PPAT diangkat oleh ...','Menteri.'],['Peraturan Jabatan PPAT','Salah satu akta PPAT adalah ...','Akta Jual Beli.'],['Peraturan Jabatan PPAT','Pemberian Hak Tanggungan dibuat dengan akta ...','APHT.'],['Peraturan Jabatan PPAT','Pemberian kuasa membebankan Hak Tanggungan dibuat dengan ...','SKMHT.'],['Pembuatan Akta PPAT','Akta PPAT wajib dibacakan atau dijelaskan kepada ...','Para pihak.'],['Pembuatan Akta PPAT','Saksi minimal dalam akta PPAT adalah ...','2 orang.'],['Pembuatan Akta PPAT','Akta PPAT ditandatangani oleh ...','Para pihak, saksi, dan PPAT.'],['Pembuatan Akta PPAT','Lembar pertama akta PPAT disimpan oleh ...','PPAT.'],['Pembuatan Akta PPAT','Buku daftar akta PPAT dibuat untuk ...','Mencatat semua akta secara berurut.'],['Pembuatan Akta PPAT','Jika tidak ada akta pada hari kerja, dicantumkan ...','Nihil.'],['Pembuatan Akta PPAT','Pada akhir bulan daftar akta ditutup dengan garis ...','Merah.'],['Pembuatan Akta PPAT','Stempel jabatan PPAT menggunakan tinta warna ...','Merah.'],['Pembuatan Akta PPAT','Warkah adalah ...','Dokumen yang menjadi dasar pembuatan akta.'],['Kode Etik IPPAT','Kode Etik IPPAT wajib ditaati oleh ...','PPAT, anggota IPPAT, dan PPAT Pengganti.'],['Kode Etik IPPAT','Schorsing berarti ...','Pemecatan sementara dari keanggotaan IPPAT.'],['Kode Etik IPPAT','Teguran dan peringatan termasuk ...','Sanksi kode etik.'],['Kode Etik IPPAT','PPAT harus bersikap ...','Mandiri, jujur, bertanggung jawab, dan tidak berpihak.'],['PMPJ dan Honorarium','PMPJ adalah singkatan dari ...','Prinsip Mengenali Pengguna Jasa.'],['PMPJ dan Honorarium','PMPJ berkaitan dengan pengenalan ...','Pengguna jasa dan transaksi yang berisiko.'],['PMPJ dan Honorarium','Batas umum uang jasa PPAT paling banyak ...','1% dari harga transaksi dalam akta.'],['PMPJ dan Honorarium','Orang tidak mampu yang dapat dibebaskan biaya dibuktikan dengan ...','SKTM dari instansi berwenang.'],['Magang dan Ujian PPAT','Pendaftaran magang IPPAT dilakukan melalui ...','Akun atau sistem online PP IPPAT.'],['Magang dan Ujian PPAT','Ujian PPAT modern menggunakan ...','Computer Based Test atau CAT.'],['Magang dan Ujian PPAT','Jumlah soal simulasi ujian adalah ...','100 soal pilihan ganda.'],['Magang dan Ujian PPAT','Durasi standar simulasi adalah ...','120 menit.'],['Magang dan Ujian PPAT','Soal tidak dijawab bernilai ...','0.'],['Magang dan Ujian PPAT','Nilai tertinggi skema simulasi mendekati ...','190.'],['Magang dan Ujian PPAT','Jawaban salah pada skema CAT ...','Mengurangi nilai sesuai kategori soal.'],['Pendaftaran Tanah','Nomor Identifikasi Bidang disingkat ...','NIB.'],['Pendaftaran Tanah','Hak Pakai termasuk ...','Hak atas tanah.']
];
function mapRow(a){return a.map(([c,m,t,o,e])=>({category:c,module:m,question:t,options:o,answerIndex:0,explanation:e}))}
const H=[...HARD_1,...HARD_2,...HARD_3A,...HARD_3B,...HARD_4,...HARD_5A,...HARD_5B,...HARD_5C];
export const QUESTIONS=[...mapRow(H),...rows(M),...rowsB(B)];
