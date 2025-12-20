import { useState, useEffect, useMemo } from "react";
import "./App.css";
// import axios agar bisa terhubung ke backend
import axios from "axios";
// import nivo/line untuk membuat grafik
import { ResponsiveLine } from "@nivo/line";
// import ini untuk mengelola cookie
import Cookies from "js-cookie";

// import komponen
import Navbar from "./components/Navbar";
import Skeleton from "./components/Skeleton";
import Clock from "./components/Clock";
import weatherIcon from "./components/WeatherIcon";
import Credit from "./components/Credit";
import LocationSelector from "./components/LocationSelector";
import getWeatherImage from "./data/WeatherImages";
import getWeatherInstruction from "./data/Instructions";

// icon lucide react
import {
  Cloud,
  Droplet,
  Wind,
  Umbrella,
  Eye,
  Compass,
  Info,
  RefreshCcw,
} from "lucide-react";

export default function App() {
  const [weather, setWeather] = useState([]);
  // data lokasi desa
  const [currentVillage, setCurrentVillage] = useState(
    Cookies.get("location") || "31.71.03.1001"
  );

  // set title untuk halaman ini
  const pageTitle = "Cuaca hari ini";
  document.title = `${pageTitle} | Cuacaqu`;

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
    <>
      {/* menu */}
      <Navbar title={pageTitle} />
      <div className="flex bg-neutral-50">
        {/* tampilan utama */}
        <div className="md:ml-16 md:mt-0 mt-16 grid md:grid-cols-5 grid-cols-1 gap-4 md:max-h-screen md:p-[5vh] p-[3vh]">
          {/* info cuaca hari ini */}
          <div className="md:col-span-2 h-[100vh-10vh] rounded-xl overflow-hidden relative">
            <WeatherOverview
              weather={weather}
              currentVillage={currentVillage}
              setCurrentVillage={setCurrentVillage}
            />
          </div>

          {/* detail cuaca & prediksi besok */}
          <div className="md:col-span-3 grid grid-cols-2 md:gap-3 gap-4 md:overflow-y-scroll">
            {/* detail cuaca */}
            <WeatherDetail weather={weather} />

            {/* prediksi cuaca beberapa jam kedepan */}
            <UpcomingHours weather={weather} />

            {/* grafik curah hujan */}
            <PrecipitationGraph data={weather.upcomingHour || []} />

            {/* perkiraan cuaca harian */}
            <UpcomingDays weather={weather} />

            {/* sumber data */}
            <Credit metadata={weather.metadata} />
          </div>
        </div>
      </div>
    </>
  );
}

// elemen yang menampilkan overview cuaca
function WeatherOverview({ weather, currentVillage, setCurrentVillage }) {
  // state untuk menapilkan form ganti lokasi
  const [openLocationSelector, setOpenLocationSelector] = useState(false);
  // state untuk menampilkan/sembunyikan owner (sumber) foto
  const [openCredit, setOpenCredit] = useState(false);
  // state untuk menampilkan/sembunyikan ikon ganti lokasi
  const [showChangeLocation, setShowChangeLocation] = useState(false);

  // fungsi buat nomor random
  function randomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  // dapatkan ikon dan keterangan cuaca
  const weatherCondition = weatherIcon(
    weather.today ? weather.today.weather : 0,
    new Date().getHours()
  );

  // dapatkan background sesuai cuaca saat ini
  const getWeatherBackground = useMemo(() => {
    return getWeatherImage(weather.today?.weather, randomNumber);
  }, [weather.today]);

  // dapatkan instruksi random sesuai cuaca saat ini
  const getRandomInstruction = useMemo(() => {
    return getWeatherInstruction(weather.today?.weather, randomNumber);
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
        <div
          onMouseEnter={() => setOpenCredit(true)}
          onMouseLeave={() => setOpenCredit(false)}
          className={`absolute top-5 right-5 bg-black bg-opacity-70 rounded-full text-white text-sm p-3 flex items-center gap-1 ${
            openCredit ? "" : "opacity-70"
          }`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              openCredit ? "" : "hidden"
            }`}
          >
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
      <div className="absolute w-full p-7 bottom-0 left-0 text-white md:space-y-4 space-y-2">
        <div className="space-y-1">
          <div className="font-bold md:text-7xl text-5xl">
            {weather.today ? weather.today.temp : "..."}°
          </div>
          <div className="flex items-center md:gap-3 gap-2 font-semibold md:text-4xl text-2xl">
            <weatherCondition.icon
              className="md:size-11 size-8"
              strokeWidth={3}
              width={43}
              height={41}
            />{" "}
            {weatherCondition.desc}
          </div>
        </div>
        <div className="italic md:text-base text-sm pr-10">
          {getRandomInstruction}
        </div>

        <div className="flex justify-between items-end md:text-base text-sm">
          <div className="relative">
            <div
              onClick={() => setOpenLocationSelector(!openLocationSelector)}
              className="hover:underline hover:underline-offset-4 hover:decoration-2 cursor-pointer flex gap-2 items-center"
              title="Ubah lokasi"
              onMouseOver={() => setShowChangeLocation(true)}
              onMouseLeave={() => setShowChangeLocation(false)}
            >
              {weather.metadata ? weather.metadata.location : "..."}
              <span
                className={showChangeLocation ? "opacity-100" : "opacity-0"}
              >
                <RefreshCcw size={20} />
              </span>
              {/* {showChangeLocation && <RefreshCcw size={20} />} */}
            </div>

            {openLocationSelector && (
              <div className="absolute bottom-10">
                <LocationSelector
                  currentVillage={currentVillage}
                  setCurrentVillage={setCurrentVillage}
                />
              </div>
            )}
          </div>
          <Clock />
        </div>
      </div>
    </>
  );
}

// layout dari komponen detail cuaca, dll
function ComponentLayout({ title, children }) {
  return (
    <div className="h-full sm:col-span-1 col-span-2 space-y-1 bg-neutral-100 shadow-sm p-5 rounded-xl">
      <div className="font-semibold text-lg">{title}</div>
      <div className="divide-y divide-solid h-full">{children}</div>
    </div>
  );
}

// componen item detail cuaca
// eslint-disable-next-line no-unused-vars
function WeatherDetailItem({ Icon, title, value, unit }) {
  return value !== undefined || value !== null ? (
    // jika value ada nilainya, maka tampilkan data
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center gap-1">
        <Icon width={16} height={16} />
        {title}
      </div>
      <div>
        <span className="font-bold text-xl">{value}</span>
        <span className="text-sm">{unit}</span>
      </div>
    </div>
  ) : (
    // jika value tidak ada nilainya, maka tampilkan skeleton (loading)
    <div className="flex justify-between items-center gap-2 py-4">
      <Skeleton width={"70%"} />
      <Skeleton width={"20%"} />
    </div>
  );
}

// detail cuaca
function WeatherDetail({ weather }) {
  return (
    <ComponentLayout title={"Detail Cuaca"}>
      {/* kelembapan */}
      <WeatherDetailItem
        Icon={Droplet}
        title={"Kelembapan"}
        value={weather.today?.humidity}
        unit={"%"}
      />
      {/* Curah hujan */}
      <WeatherDetailItem
        Icon={Umbrella}
        title={"Curah hujan"}
        value={weather.today?.precipitation}
        unit={"mm"}
      />
      {/* tutupan awan */}
      <WeatherDetailItem
        Icon={Cloud}
        title={"Tutupan awan"}
        value={weather.today?.cloudCover}
        unit={"%"}
      />
      {/* jarak pandang */}
      <WeatherDetailItem
        Icon={Eye}
        title={"Jarak pandang"}
        value={weather.today?.visibility}
        unit={"km"}
      />
      {/* Kecepatan angin */}
      <WeatherDetailItem
        Icon={Wind}
        title={"Kecepatan angin"}
        value={weather.today?.windSpeed}
        unit={"km/j"}
      />
      {/* Arah angin */}
      <WeatherDetailItem
        Icon={Compass}
        title={"Arah angin"}
        value={weather.today?.windDir}
      />
    </ComponentLayout>
  );
}

// prediksi cuaca beberapa jam kedepan
function UpcomingHours({ weather }) {
  return (
    <ComponentLayout title={"Prakiraan Cuaca Kedepan"}>
      {/* perulangan waktu */}
      {weather.upcomingHour ? (
        weather.upcomingHour.map((item) => {
          const Icon = weatherIcon(item ? item.weather : 0, item.time).icon;
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
    </ComponentLayout>
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
    <ComponentLayout title={"Curah hujan"}>
      <div className="md:h-full min-h-36">
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
    </ComponentLayout>
  );
}

// elemen perkiraan cuaca harian
function UpcomingDays({ weather }) {
  return (
    <ComponentLayout title={"Perkiraan Cuaca Harian"}>
      {weather.upcomingDays ? (
        weather.upcomingDays.map((item, i) => {
          const upcomingWeather = weatherIcon(item.weather, 12);
          return (
            <div className="py-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{i === 0 ? "Besok" : "Lusa"}</div>
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
    </ComponentLayout>
  );
}
