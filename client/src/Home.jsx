import { useState, useEffect, useMemo } from "react";
import "./App.css";
// import axios agar bisa terhubung ke backend
import axios from "axios";
// import nivo/line untuk membuat grafik
import { ResponsiveLine } from "@nivo/line";
// import ini untuk mengelola cookie
import Cookies from "js-cookie";

// import komponen
import Menu from "./components/Menu";
import Skeleton from "./components/Skeleton";
import Clock from "./components/Clock";
import WeatherIcon from "./components/WeatherIcon";

// icon lucide react
import {
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSun,
  CloudMoon,
  Droplet,
  Wind,
  Umbrella,
  Eye,
  Compass,
  Sun,
  Loader,
  Info,
  Moon,
  Cloudy,
  CloudFog,
  CloudRainWind,
  CloudHail,
  CloudLightning,
  SunMoon,
  Calendar,
  ChevronRight,
  MapPinPen,
} from "lucide-react";

export default function App() {
  const [weather, setWeather] = useState([]);
  // data lokasi desa
  const [currentVillage, setCurrentVillage] = useState(
    Cookies.get("location") || "31.71.03.1001"
  );

  // fungsi untuk mendapat data dari backend
  const fetchAPI = async () => {
    const response = await axios.get(
      `http://localhost:8080/weather-today?code=${currentVillage.replaceAll(
        '"'
      )}`
    );
    setWeather(response.data);
  };
  useEffect(() => {
    fetchAPI();
    // set cookie lokasi selama 1 tahun
    Cookies.set("location", currentVillage, { expires: 365 });
  }, [currentVillage]);

  return (
    <div className="flex bg-neutral-50">
      {/* menu */}
      <Menu />

      {/* tampilan utama */}
      <div className="grid grid-cols-5 gap-4 h-screen p-[5vh]">
        {/* info cuaca hari ini */}
        <div className="col-span-2 h-[100vh-10vh] rounded-xl overflow-hidden relative">
          <WeatherOverview
            weather={weather}
            currentVillage={currentVillage}
            setCurrentVillage={setCurrentVillage}
          />
        </div>

        {/* detail cuaca & prediksi besok */}
        <div className="col-span-3 grid grid-cols-2 gap-3 overflow-y-scroll">
          {/* detail cuaca */}
          <WeatherDetail weather={weather} />

          {/* prediksi cuaca beberapa jam kedepan */}
          <UpcomingHours
            weather={weather}
          />

          {/* grafik curah hujan */}
          <PrecipitationGraph data={weather.upcomingHour || []} />

          {/* perkiraan cuaca harian */}
          <UpcomingDays weather={weather} />

          {/* sumber data */}
          <Source weather={weather} />
        </div>
      </div>
    </div>
  );
}

// elemen yang menampilkan overview cuaca
function WeatherOverview({
  weather,
  currentVillage,
  setCurrentVillage,
}) {
  // state untuk menapilkan form ganti lokasi
  const [openLocationChanger, setOpenLocationChanger] = useState(false);
  // state untuk menampung data lokasi
  const [provinceList, setProvinceList] = useState([]);
  const [regencyList, setRegencyList] = useState([]);
  const [districList, setDistricList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  // lokasi saat ini
  const loc = Cookies.get("location").split(".");
  const [currentProvince, setCurrentProvince] = useState(loc ? loc[0] : "31");
  const [currentRegency, setCurrentRegency] = useState(
    loc ? `${loc[0]}.${loc[1]}` : "31.71"
  );
  const [currentDistric, setCurrentDistric] = useState(
    loc ? `${loc[0]}.${loc[1]}.${loc[2]}` : "31.71.03"
  );
  // data village disimpan pada parent

  // fungsi ambil data dari backend
  async function fetchLocation(code = "") {
    const response = await axios.get(
      `http://localhost:8080/location?code=${code}`
    );
    return response.data;
  }

  // ambil daftar provinsi
  useEffect(() => {
    fetchLocation().then((data) => setProvinceList(data));
  }, []);

  // ambil daftar kabupaten, dijalankan jika isi currentprovince berubah
  useEffect(() => {
    if (!currentProvince) return;
    fetchLocation(currentProvince).then((data) => {
      setRegencyList(data);
      setDistricList([]);
      setVillageList([]);
      // setCurrentRegency("");
      // setCurrentDistric("");
    });
  }, [currentProvince]);

  // ambil data kecamatan, dijalankan saat data kabupaten berubah
  useEffect(() => {
    if (!currentRegency) return;
    fetchLocation(currentRegency).then((data) => {
      setDistricList(data);
      setVillageList([]);
      // setCurrentDistric("");
    });
  }, [currentRegency]);

  // ambil data desa, dijalankan saat data kecamatan berubah
  useEffect(() => {
    if (!currentDistric) return;
    fetchLocation(currentDistric).then((data) => {
      setVillageList(data);
    });
  }, [currentDistric]);

  // fungsi untuk memilih background cuaca
  function weatherBackground(weather) {
    // data gambar yang akan dikirim
    const sunny = [
      {
        background: "/weather-images/sunny-1.jpg",
        owner: "Rival Sitorus",
        ownerURL: "https://unsplash.com/@rivalsitorus",
        backgroundURL:
          "https://unsplash.com/photos/brown-concrete-monument-near-body-of-water-during-daytime-9U283eOPeBk",
      },
      {
        background: "/weather-images/sunny-2.jpg",
        owner: "Eugenia Clara",
        ownerURL: "https://unsplash.com/@eugeniaclara",
        backgroundURL:
          "https://unsplash.com/photos/man-in-white-dress-shirt-standing-near-glass-window-CkKPsmEsv-E",
      },
      {
        background: "/weather-images/sunny-3.jpg",
        owner: "Julio Samudra",
        ownerURL: "https://unsplash.com/@tofrus",
        backgroundURL:
          "https://unsplash.com/photos/a-view-of-the-ocean-from-the-top-of-a-building-svunmtYr85o",
      },
      {
        background: "/weather-images/sunny-4.jpg",
        owner: "Defrino Maasy",
        ownerURL: "https://unsplash.com/@defrino",
        backgroundURL:
          "https://unsplash.com/photos/architectural-detail-of-a-modern-building-against-a-blue-sky-gm-zY_6p2vw",
      },
      {
        background: "/weather-images/sunny-5.jpg",
        owner: "Marthn Luther",
        ownerURL: "https://unsplash.com/@yurriann",
        backgroundURL:
          "https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-nEVZd2Z-2i0",
      },
      {
        background: "/weather-images/sunny-6.jpg",
        owner: "Liliia",
        ownerURL: "https://unsplash.com/@vlailaa",
        backgroundURL:
          "https://unsplash.com/photos/a-lush-green-field-with-a-small-village-in-the-distance-z8-pbb3RTjs",
      },
    ];

    const cloudy = [
      {
        background: "/weather-images/cloudy-1.jpg",
        owner: "Affan Fadhlan",
        ownerURL: "https://unsplash.com/@affanfadhlan",
        backgroundURL:
          "https://unsplash.com/photos/a-large-cloud-in-the-sky-with-a-plane-flying-by-lRmIu1k7ZOM",
      },
      {
        background: "/weather-images/cloudy-2.jpg",
        owner: "Affan Fadhlan",
        ownerURL: "https://unsplash.com/@affanfadhlan",
        backgroundURL:
          "https://unsplash.com/photos/a-tall-building-with-a-weather-vane-on-top-of-it-8Nls6N3xPgU",
      },
      {
        background: "/weather-images/cloudy-3.jpg",
        owner: "Bastian Ragas",
        ownerURL: "https://unsplash.com/@baslightyearrr",
        backgroundURL:
          "https://unsplash.com/photos/a-serene-lake-surrounded-by-lush-green-hills-pk1i_eBzQ1A",
      },
      {
        background: "/weather-images/cloudy-4.jpg",
        owner: "David Kristianto",
        ownerURL: "https://unsplash.com/@davidkristianto",
        backgroundURL:
          "https://unsplash.com/photos/an-aerial-view-of-a-cityscape-under-a-cloudy-sky-ygAE99gQ1uo",
      },
      {
        background: "/weather-images/cloudy-5.jpg",
        owner: "Marcella Oscar",
        ownerURL: "https://unsplash.com/@marcellaoscar",
        backgroundURL:
          "https://unsplash.com/photos/thatch-buildings-on-grass-field-during-day-E7Ef4iBfwMc",
      },
    ];

    const foggy = [
      {
        background: "/weather-images/foggy-1.jpg",
        owner: "Anatliy Shostak",
        ownerURL: "https://unsplash.com/@photogolic",
        backgroundURL:
          "https://unsplash.com/photos/green-trees-near-mountain-under-white-clouds-during-daytime-hDr6k9UNOcA",
      },
      {
        background: "/weather-images/foggy-2.jpg",
        owner: "Just Meg",
        ownerURL: "https://unsplash.com/@megaariii",
        backgroundURL:
          "https://unsplash.com/photos/a-foggy-valley-with-trees-and-mountains-in-the-distance-z3WHMGaSP4w",
      },
      {
        background: "/weather-images/foggy-3.jpg",
        owner: "Ebenhaezer Kambuaya",
        ownerURL: "https://unsplash.com/@lmnezer",
        backgroundURL:
          "https://unsplash.com/photos/a-curve-in-the-road-with-power-lines-above-it-82vWF-9X4oc",
      },
      {
        background: "/weather-images/foggy-4.jpg",
        owner: "Daffa Umar",
        ownerURL: "https://unsplash.com/@daffaumar",
        backgroundURL:
          "https://unsplash.com/photos/a-foggy-road-curves-around-a-tall-tree-2e50qjlXf8o",
      },
      {
        background: "/weather-images/foggy-5.jpg",
        owner: "Joshua Kettle ",
        ownerURL: "https://unsplash.com/@joshuakettle",
        backgroundURL:
          "https://unsplash.com/photos/a-black-and-white-photo-of-a-foggy-forest-lMZVvwnjHH4",
      },
      {
        background: "/weather-images/foggy-6.jpg",
        owner: "Bady Abbas",
        ownerURL: "https://unsplash.com/@bady",
        backgroundURL:
          "https://unsplash.com/photos/selective-focus-photo-of-yellow-petaled-flower-chrySQDSOvI",
      },
      {
        background: "/weather-images/foggy-7.jpg",
        owner: "Safuan Safuan",
        ownerURL: "https://unsplash.com/@safuan",
        backgroundURL:
          "https://unsplash.com/photos/misty-city-landscape-with-trees-and-a-building--lFxWDNyylA",
      },
    ];

    const rainy = [
      {
        background: "/weather-images/rain-1.jpg",
        owner: "Bima Diego Pradipta",
        ownerURL: "https://unsplash.com/@biramadiego",
        backgroundURL:
          "https://unsplash.com/photos/black-bicycle-parked-beside-green-plants-during-daytime-EOzxYQ_nY1U",
      },
      {
        background: "/weather-images/rain-2.jpg",
        owner: "Edo Rahayu",
        ownerURL: "https://unsplash.com/@edorahayu",
        backgroundURL:
          "https://unsplash.com/photos/a-rain-soaked-park-with-benches-and-trees-cAU4UbGE5Vk",
      },
      {
        background: "/weather-images/rain-3.jpg",
        owner: "Mohamed Jamil Latrach",
        ownerURL: "https://unsplash.com/@jamillatrach",
        backgroundURL:
          "https://unsplash.com/photos/person-riding-motorcycle-M4z2FGRJbeA",
      },
      {
        background: "/weather-images/rain-4.jpg",
        owner: "Jody",
        ownerURL: "https://unsplash.com/@jodyyyyyyyyyyyyyyyyy",
        backgroundURL:
          "https://unsplash.com/photos/a-colorful-umbrella-sitting-on-top-of-a-wet-ground-iDdR_XEq0Vs",
      },
      {
        background: "/weather-images/rain-5.jpg",
        owner: "Jakarta Addicted",
        ownerURL: "https://unsplash.com/@kukukkikuk",
        backgroundURL:
          "https://unsplash.com/photos/a-foggy-city-street-with-cars-driving-on-it-UTUPRQRAoQY",
      },
    ];

    switch (weather) {
      case "Cerah":
        return sunny[randomNumber(sunny.length)];
      case "Cerah Berawan":
        return sunny[randomNumber(sunny.length)];

      case "Berawan":
        return cloudy[randomNumber(cloudy.length)];
      case "Berawan Tebal":
        return cloudy[randomNumber(cloudy.length)];

      case "Asap":
        return foggy[randomNumber(foggy.length)];
      case "Kabut":
        return foggy[randomNumber(foggy.length)];

      case "Hujan Ringan":
        return rainy[randomNumber(rainy.length)];
      case "Hujan Sedang":
        return rainy[randomNumber(rainy.length)];
      case "Hujan Lokal":
        return rainy[randomNumber(rainy.length)];
      case "Hujan Lebat":
        return rainy[randomNumber(rainy.length)];
      case "Hujan Badai":
        return rainy[randomNumber(rainy.length)];
      case "Petir":
        return rainy[randomNumber(rainy.length)];

      default:
        return {
          background: "/weather-images/loading.jpg",
        };
    }
  }
  // fungsi kata-kata random
  function randomInstruction(weather) {
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

  // buat nomor random
  function randomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  // dapatkan ikon dan keterangan cuaca
  const weatherCondition = WeatherIcon(
    weather.today ? weather.today.weather : 0,
    new Date().getHours()
  );

  // dapatkan background sesuai cuaca saat ini
  const getWeatherBackground = useMemo(() => {
    return weatherBackground(weather.today ? weather.today.weather : "");
  }, [weather.today]);

  // dapatkan instruksi random sesuai cuaca saat ini
  const getRandomInstruction = useMemo(() => {
    return randomInstruction(weather.today ? weather.today.weather : "");
  }, [weather.today]);

  return (
    <>
      <img
        className="h-full w-full object-cover"
        src={getWeatherBackground.background}
        alt=""
      />
      {/* info gambar */}
      {getWeatherBackground.owner && (
        <div className="absolute top-5 right-5 bg-black bg-opacity-70 rounded-lg text-white text-sm p-2 flex items-center gap-1">
          <div>
            Photo by{" "}
            <a href={getWeatherBackground.ownerURL}>
              {getWeatherBackground.owner}
            </a>{" "}
            on <a href={getWeatherBackground.backgroundURL}>Unsplash</a>
          </div>
          <Info size={16} />
        </div>
      )}
      {/* info cuaca */}
      <div className="absolute w-full p-7 bottom-0 left-0 text-white space-y-4">
        <div className="space-y-1">
          <div className="font-bold text-7xl">
            {weather.today ? weather.today.temp : "..."}°
          </div>
          <div className="flex gap-3 font-semibold text-4xl">
            <weatherCondition.icon
              strokeWidth={3}
              size={40}
              width={43}
              height={41}
            />{" "}
            {weatherCondition.desc}
          </div>
        </div>
        <div className="italic pr-10">{getRandomInstruction}</div>

        <div className="flex justify-between items-end">
          <div className="relative">
            <div
              onClick={() => setOpenLocationChanger(!openLocationChanger)}
              className="hover:underline hover:underline-offset-4 hover:decoration-2 cursor-pointer"
            >
              {weather.metadata ? weather.metadata.location : "..."}
            </div>

            {openLocationChanger && (
              <div className="absolute bottom-10 bg-neutral-50 shadow-sm rounded-lg text-black p-4 space-y-2 min-w-56">
                {/* title */}
                <div className="mb-1 flex items-center gap-1">
                  <MapPinPen size={20} />
                  Ubah lokasi
                </div>

                {/* select provinsi */}
                {provinceList.length > 0 ? (
                  <select
                    name="selectProvince"
                    id="selectProvince"
                    value={currentProvince}
                    onChange={(e) => {
                      setCurrentProvince(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
                  >
                    <option value="">Pilih</option>
                    {provinceList.map((province) => (
                      <option value={province.code}>{province.name}</option>
                    ))}
                  </select>
                ) : (
                  <Skeleton height={"2rem"} />
                )}

                {/* Select kabupaten */}
                {regencyList.length > 0 ? (
                  <select
                    name="selectRegency"
                    id="selectRegency"
                    value={currentRegency}
                    onChange={(e) => {
                      setCurrentRegency(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
                  >
                    <option value="">Pilih</option>
                    {regencyList.map((regency) => (
                      <option value={regency.code}>{regency.name}</option>
                    ))}
                  </select>
                ) : (
                  <Skeleton height={"2rem"} />
                )}

                {/* select kecamatan */}
                {districList.length > 0 ? (
                  <select
                    name="selectDistric"
                    id="selectDistric"
                    value={currentDistric}
                    onChange={(e) => {
                      setCurrentDistric(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
                  >
                    <option value="">Pilih</option>
                    {districList.map((subDistrics) => (
                      <option value={subDistrics.code}>
                        {subDistrics.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Skeleton height={"2rem"} />
                )}

                {/* select desa */}
                {villageList.length > 0 ? (
                  <select
                    name="selectVillage"
                    id="selectVillage"
                    value={currentVillage}
                    onChange={(e) => {
                      setCurrentVillage(e.target.value);
                    }}
                    className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
                  >
                    <option value="">Pilih</option>
                    {villageList.map((village) => (
                      <option value={village.code}>{village.name}</option>
                    ))}
                  </select>
                ) : (
                  <Skeleton height={"2rem"} />
                )}
              </div>
            )}
          </div>
          <Clock />
        </div>
      </div>
    </>
  );
}

// detail cuaca
function WeatherDetail({ weather }) {
  return (
    <div className="h-full space-y-3 border border-neutral-200 p-4 rounded-lg">
      <div className="font-semibold text-lg">Detail Cuaca</div>
      {weather.today ? (
        <div className="divide-y divide-solid">
          {/* kelembapan */}
          <div className="flex justify-between items-center pb-2">
            <div className="flex items-center gap-1">
              <Droplet width={16} height={16} />
              Kelembapan
            </div>
            <div>
              <span className="font-bold text-xl">
                {weather.today.humidity}
              </span>
              <span className="text-sm">%</span>
            </div>
          </div>
          {/* Curah hujan */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <Umbrella width={16} height={16} />
              Curah hujan
            </div>
            <div>
              <span className="font-bold text-xl">
                {weather.today.precipitation}
              </span>
              <span className="text-sm">mm</span>
            </div>
          </div>
          {/* tutupan awan */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <Cloud width={16} height={16} />
              Tutupan awan
            </div>
            <div>
              <span className="font-bold text-xl">
                {weather.today.cloudCover}
              </span>
              <span className="text-sm">%</span>
            </div>
          </div>

          {/* jarak pandang */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <Eye width={16} height={16} />
              Jarak pandang
            </div>
            <div>
              <span className="font-bold text-xl">
                {weather.today.visibility}
              </span>
              <span className="text-sm">km</span>
            </div>
          </div>

          {/* Kecepatan angin */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <Wind width={16} height={16} />
              Kecepatan angin
            </div>
            <div>
              <span className="font-bold text-xl">
                {weather.today.windSpeed}
              </span>
              <span className="text-sm">km/j</span>
            </div>
          </div>

          {/* Arah angin */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <Compass width={16} height={16} />
              Arah angin dari
            </div>
            <div className="font-bold text-xl">{weather.today.windDir}</div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-solid">
          <div className="flex justify-between items-center gap-2 pt-2 pb-4">
            <Skeleton width={"70%"} />
            <Skeleton width={"20%"} />
          </div>
          {[...Array(5)].map(() => (
            <div className="flex justify-between items-center gap-2 py-4">
              <Skeleton width={"70%"} />
              <Skeleton width={"20%"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// prediksi cuaca beberapa jam kedepan
function UpcomingHours({ weather }) {
  return (
    <div className="h-full space-y-1 border border-neutral-200 p-4 rounded-lg">
      <div className="font-semibold text-lg">Prakiraan Cuaca Kedepan</div>
      <div className="divide-y divide-solid">
        {/* perulangan waktu */}
        {weather.upcomingHour ? (
          weather.upcomingHour.map((item) => {
            const Icon = WeatherIcon(
              item ? item.weather : 0,
              item.time
            ).icon;
            return (
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-1">
                  <Icon size={30} />
                  <div>
                    <div>{item.time.replaceAll(".", ":")}</div>
                    <div className="text-xs">{item.weather}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-semibold text-lg">
                  {item.temp}°
                </div>
              </div>
            );
          })
        ) : (
          <div className="divide-y divide-solid">
            <div className="flex justify-between items-center gap-2 pt-2 pb-3">
              <div className="space-y-2">
                <Skeleton width={"10rem"} />
                <Skeleton width={"6rem"} height={"1rem"} />
              </div>
              <Skeleton width={"20%"} />
            </div>
            {[...Array(4)].map(() => (
              <div className="flex justify-between items-center gap-2 py-3">
                <div className="space-y-2">
                  <Skeleton width={"10rem"} />
                  <Skeleton width={"6rem"} height={"1rem"} />
                </div>
                <Skeleton width={"20%"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// grafik curah hujan
function PrecipitationGraph({ data }) {
  // Data grafik
  const graphData = [
    {
      id: "Suhu",
      color: "hsl(200, 70%, 50%)",
      data: data.map((item) => ({
        x: item.time,
        y: item.precipitation,
      })),
      // data: [
      //   { x: "10:00", y: 10 },
      //   { x: "13:00", y: 20 },
      //   { x: "16:00", y: 25 },
      //   { x: "19:00", y: 5 },
      //   { x: "22:00", y: 22 },
      // ],
    },
  ];

  return (
    <div className="col-span-1 h-full space-y-1 border border-neutral-200 p-4 rounded-lg">
      <div className="font-semibold text-lg">
        Curah Hujan <span className="font-normal">(mm)</span>
      </div>
      <div className="h-full w-full">
        <ResponsiveLine
          data={graphData}
          curve="cardinal"
          margin={{ top: 10, right: 15, bottom: 50, left: 30 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "0",
            max: "30",
            stacked: false,
            reverse: false,
          }}
          axisBottom={{
            orient: "bottom",
            // legend: "Waktu",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            // legend: "Curah hujan (mm)",
            legendOffset: -40,
            legendPosition: "middle",
            tickValues: 4,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableArea={true}
          areaOpacity={0.5}
          colors={["#2563eb"]}
          useMesh={true}
        />
      </div>
    </div>
  );
}

// elemen perkiraan cuaca harian
function UpcomingDays({ weather }) {
  return (
    <div className="col-span-1 h-full space-y-1 border border-neutral-200 p-4 rounded-lg">
      <div className="font-semibold text-lg">Prakiraan Cuaca Harian</div>
      <div className="divide-y divide-solid">
        {weather.upcomingDays ? (
          weather.upcomingDays.map((item, i) => {
            const upcomingWeather = WeatherIcon(item.weather, 12);
            return (
              <div className="py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">
                      {i === 0 ? "Besok" : "Lusa"}
                    </div>
                    <div className="font-light text-sm">{item.date}</div>
                  </div>
                  <div className="flex items-center text-right gap-1">
                    <div>
                      <div className="font-bold text-xl flex items-center">
                        {item.minTemp}°-{item.maxTemp}°
                        <span title={`Cenderung ${upcomingWeather.desc}`}>
                          <upcomingWeather.icon strokeWidth={2} />
                        </span>
                      </div>
                      <div className="text-sm font-light">
                        Curah {item.precipitationTotal}
                        <span className="text-xs">mm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="divide-y divide-solid">
            <div className="flex justify-between items-center gap-2 pt-2 pb-3">
              <div className="space-y-2">
                <Skeleton width={"6rem"} />
                <Skeleton width={"10rem"} height={"0.7rem"} />
              </div>
              <div className="space-y-2">
                <Skeleton width={"3rem"} />
                <Skeleton width={"2rem"} height={"0.7rem"} />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 py-3">
              <div className="space-y-2">
                <Skeleton width={"6rem"} />
                <Skeleton width={"10rem"} height={"0.7rem"} />
              </div>
              <div className="space-y-2">
                <Skeleton width={"3rem"} />
                <Skeleton width={"2rem"} height={"0.7rem"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// sumber
function Source({ weather }) {
  return (
    <div className="col-span-2 text-sm italic text-neutral-800">
      <div>
        Data prediksi cuaca diperoleh dari Badan Meteorologi, Klimatologi, dan
        Geofisika
        {weather.metadata
          ? `, dianalisis pada ${weather.metadata.analysisDate.replaceAll(
              ".",
              ":"
            )}`
          : ""}
      </div>
    </div>
  );
}
