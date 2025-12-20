export default function getWeatherInstruction(weather, randomNumber) {
  // data
  const cerah = [
    "Hari cerah, tetap lindungi kulit dan cukupkan hidrasi selama beraktivitas",
    "Matahari bersinar hangat—gunakan pelindung diri dan hindari panas berlebih",
    "Cuaca cerah bersahabat, namun tetap jaga cairan tubuh agar tidak dehidrasi",
  ];
  const cerahBerawan = [
    "Awan datang dan pergi; tetap bawa pelindung hujan ringan",
    "Cuaca bersahabat, namun perubahan bisa terjadi cepat",
    "Gunakan pakaian nyaman dan tetap waspada hujan tiba-tiba",
  ];
  const berawan = [
    "Langit teduh, hujan ringan bisa muncul sewaktu-waktu",
    "Bawa payung kecil dan gunakan jaket tipis jika berangin",
    "Awasi langit agar tidak terjebak hujan mendadak",
  ];
  const berawanTebal = [
    "Awan pekat menandakan hujan segera turun—persiapkan jas hujan",
    "Hindari area terbuka jika angin mulai kencang",
    "Pertimbangkan rute aman dari genangan",
  ];
  const asap = [
    "Udara berasap—gunakan masker dan kurangi aktivitas luar",
    "Tutup rapat rumah untuk mencegah asap masuk",
    "Minum lebih banyak agar tenggorokan tidak iritasi",
  ];
  const kabut = [
    "Jarak pandang rendah; berkendara lebih hati-hati",
    "Gunakan lampu dekat dan hindari kecepatan tinggi",
    "Tunda perjalanan jauh bila kabut sangat tebal",
  ];
  const hujanRingan = [
    "Jalan licin meski hujan tipis—gunakan alas kaki aman",
    "Sedia payung dan hindari berteduh di bawah pohon",
    "Berkendara perlahan untuk menghindari selip",
  ];
  const hujanSedang = [
    "Hujan stabil membuat jalan licin—gunakan payung besar",
    "Hindari genangan karena bisa lebih dalam dari perkiraan",
    "Pastikan lampu dan wiper kendaraan berfungsi baik",
  ];
  const hujanLebat = [
    "Intensitas tinggi, potensi banjir meningkat—hindari bepergian",
    "Jauhi daerah rendah dan sungai",
    "Tutup rapat jendela dan pintu saat angin kencang",
  ];
  const hujanLokal = [
    "Hujan mungkin turun hanya di beberapa titik—siapkan payung",
    "Perhatikan jalan basah meski area lain tetap kering",
    "Berkendara perlahan di wilayah gelap atau berawan tebal",
  ];
  const hujanBadai = [
    "Hujan lebat dengan petir—segera cari tempat aman",
    "Hindari berteduh di bawah pohon dan benda tinggi",
    "Tunda perjalanan sampai cuaca benar-benar membaik",
  ];

  switch (weather) {
    case "Cerah":
      return cerah[randomNumber(cerah.length)];
    case "Cerah Berawan":
      return cerahBerawan[randomNumber(cerahBerawan.length)];
    case "Berawan":
      return berawan[randomNumber(berawan.length)];
    case "Berawan Tebal":
      return berawanTebal[randomNumber(berawanTebal.length)];
    case "Asap":
      return asap[randomNumber(asap.length)];
    case "Kabut":
      return kabut[randomNumber(kabut.length)];
    case "Hujan Ringan":
      return hujanRingan[randomNumber(hujanRingan.length)];
    case "Hujan Sedang":
      return hujanSedang[randomNumber(hujanSedang.length)];
    case "Hujan Lebat":
      return hujanLebat[randomNumber(hujanLebat.length)];
    case "Hujan Lokal":
      return hujanLokal[randomNumber(hujanLokal.length)];
    case "Hujan Badai":
      return hujanBadai[randomNumber(hujanBadai.length)];

    default:
      return "...";
  }
}
