import { useEffect, useState } from "react";
// import { useState, useEffect, useMemo } from "react";
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
import WeatherIcon from "./components/WeatherIcon";
import LocationSelector from "./components/LocationSelector";

// import icon
import {
  Cloud,
  Compass,
  Droplet,
  Eye,
  Loader,
  RefreshCcw,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";
import Credit from "./components/Credit";

export default function App() {
  // data lokasi desa
  const [currentVillage, setCurrentVillage] = useState(
    Cookies.get("location") || "31.71.03.1001"
  );
  const [weather, setWeather] = useState([]);
  const [openDetail, setOpenDetail] = useState([]);
  // state untuk menapilkan form ganti lokasi
  const [openLocationSelector, setOpenLocationSelector] = useState(false);

  // fungsi untuk mendapat data dari backend
  const fetchAPI = async () => {
    const response = await axios.get(
      `http://localhost:8080/weather-prediction?code=${currentVillage.replaceAll(
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

  // fungsi untuk meng-handle sembunyikan/tampilkan detail cuaca
  function handleOpenDetail(elementId) {
    const array = [...openDetail];
    array[elementId] = !array[elementId];
    setOpenDetail(array);
  }

  return (
    <div className="flex bg-neutral-50">
      {/* menu */}
      <Navbar title={"Prediksi cuaca"} />

      <div className="grid grid-cols-4 my-8 w-full">
        <div className=""></div>
        {/* Konten */}
        <div className="col-span-2">
          <div className="mb-5">
            <h1 className="font-bold text-2xl">Prediksi Cuaca</h1>
            {weather.metadata ? (
              <div className="text-sm">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            ) : (
              <Skeleton width={"7rem"} />
            )}
          </div>

          {/* prediksi cuaca */}
          <div className="space-y-6">
            {weather.prediction ? (
              weather.prediction.map((day, firstIndex) => (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    {/* judul */}
                    <div className="font-semibold">
                      {firstIndex == 0
                        ? "Hari ini"
                        : firstIndex == 1
                        ? "Besok"
                        : "Lusa"}
                      {/* jika hari ini, jangan tampilkan tanggal */}
                      {firstIndex != 0 ? (
                        <span className="font-normal">, {day[0].date}</span>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* lokasi atau tanggal */}
                    {firstIndex == 0 ? (
                      // jika index pertama, tampilkan lokasi
                      weather.metadata ? (
                        <div className="relative">
                          <div
                            onClick={() =>
                              setOpenLocationSelector(!openLocationSelector)
                            }
                            className="flex items-center gap-2 hover:bg-blue-100 py-0.5 px-2 rounded-full cursor-pointer"
                          >
                            {weather.metadata.location}
                            <RefreshCcw size={20} />
                          </div>
                          {openLocationSelector && (
                            <div className="absolute top-10">
                              <LocationSelector
                                currentVillage={currentVillage}
                                setCurrentVillage={setCurrentVillage}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Skeleton width={"8rem"} />
                      )
                    ) : (
                      // selain itu tampilkan kosong
                      ""
                    )}
                  </div>

                  <div className="divide-y divide-solid">
                    {day.map((item, secondIndex) => {
                      return firstIndex == 0 && secondIndex == 0 ? (
                        // cuaca di jam saat ini
                        <CurrentWeather item={item} />
                      ) : (
                        // selain itu, gunakan tampilan lebih simpel
                        <SimpleWeather
                          item={item}
                          openDetail={openDetail}
                          handleOpenDetail={handleOpenDetail}
                          firstIndex={firstIndex}
                          secondIndex={secondIndex}
                        />
                      );
                    })}
                    {/* waktu yang akan datang */}
                  </div>
                </div>
              ))
            ) : (
              <SkeletonSection />
            )}
          </div>

          {/* credit */}
          <div className="mt-3">
            <Credit metadata={weather.metadata} />
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

function CurrentWeather({ item }) {
  const Icon = WeatherIcon(item.weather, item.time).icon;
  return (
    <div className="flex items-center justify-between bg-blue-200 p-4">
      <div className="flex items-center gap-4">
        <div title={item.weather}>
          <Icon size={30} />
        </div>
        <div className="">
          <div className="font-bold text-3xl">
            <Clock />
          </div>
          <div className="text-sm">{item.weather}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <Umbrella size={20} />
          <div className="">
            <span className="text-lg">{item.precipitation}</span>
            <span className="text-xs">mm</span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <Droplet size={20} />
          <div className="">
            <span className="text-lg">{item.humidity}</span>
            <span className="text-xs">%</span>
          </div>
        </div>
        <div className="flex gap-1 text-lg items-center">
          <Thermometer size={20} />
          {item.temp}°
        </div>
      </div>
    </div>
  );
}

// tampilan prediksi cuaca yang simpel
function SimpleWeather({
  item,
  openDetail,
  handleOpenDetail,
  firstIndex,
  secondIndex,
}) {
  const Icon = WeatherIcon(item.weather, item.time).icon;
  return (
    <div
      onClick={() =>
        handleOpenDetail(String(firstIndex + 1) + String(secondIndex))
      }
      className="p-4 hover:bg-blue-100 space-y-3 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="" title={item.weather}>
            <Icon size={30} />
          </div>
          <div className="text-xl">{item.time}</div>
        </div>
        <div className="flex gap-1 text-lg items-center">{item.temp}°</div>
      </div>
      {openDetail[String(firstIndex + 1) + String(secondIndex)] == true && (
        <div
          key={secondIndex}
          id={String(firstIndex + 1) + String(secondIndex)}
          className="grid grid-cols-3 gap-2 text-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Droplet size={16} />
              Kelembapan
            </div>
            <div className="">{item.humidity}%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Umbrella size={16} />
              Curah hujan
            </div>
            <div className="">{item.precipitation}mm</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Cloud size={16} />
              Tutupan awan
            </div>
            <div className="">{item.cloudCover}%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              Jarak pandang
            </div>
            <div className="">{item.visibility}km</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Wind size={16} />
              Kecepatan angin
            </div>
            <div className="">{item.windSpeed}km/j</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Compass size={16} />
              Arah angin dari
            </div>
            <div title={item.windDir.long}>{item.windDir.short}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// elemen yang ditampilkan saat data belum dimuat
function SkeletonSection() {
  return [...Array(3)].map((_, index) => (
    <div key={index} className="space-y-3">
      <div className="flex justify-between items-center">
        {/* judul */}
        <Skeleton width={"8rem"} />
      </div>

      <div className="divide-y divide-solid">
        {[...Array(5)].map(() => (
          <div className="p-4 space-y-3 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Loader size={30} />
                <Skeleton width={"10rem"} height={"1.5rem"} />
              </div>
              <div className="flex gap-1 text-lg items-center">
                <Skeleton width={"3rem"} />
              </div>
            </div>
          </div>
        ))}
        {/* waktu yang akan datang */}
      </div>
    </div>
  ));
}
