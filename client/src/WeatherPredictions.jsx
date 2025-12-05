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
import Menu from "./components/Menu";
import Skeleton from "./components/Skeleton";
import Clock from "./components/Clock";
import WeatherIcon from "./components/WeatherIcon";

// import icon
import {
  Cloud,
  Compass,
  Droplet,
  Eye,
  RefreshCcw,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";

export default function App() {
  const [weather, setWeather] = useState([]);
  const [openDetail, setOpenDetail] = useState([]);

  // dapatkan data cuaca
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        "http://localhost:8080/weather-prediction"
      );
      setWeather(response.data);
    };
    fetchAPI();
  }, []);

  // fungsi untuk meng-handle sembunyikan/tampilkan detail cuaca
  function handleOpenDetail(elementId) {
    const array = [...openDetail];
    array[elementId] = !array[elementId];
    setOpenDetail(array);
  }

  return (
    <div className="flex bg-neutral-50">
      {/* menu */}
      <Menu />

      <div className="grid grid-cols-4 mt-8 w-full">
        <div className=""></div>
        {/* Konten */}
        <div className="col-span-2">
          <div className="mb-5">
            <h1 className="font-bold text-2xl">Prediksi Cuaca</h1>
            {weather.metadata ? (
              <div className="text-sm">{weather.metadata.analysisDate}</div>
            ) : (
              <Skeleton width={"7rem"} />
            )}
          </div>

          {/* prediksi cuaca */}
          <div className="space-y-6">
            {weather.prediction
              ? weather.prediction.map((day, firstIndex) => (
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
                          <div className="flex items-center gap-2 hover:bg-blue-100 py-0.5 px-2 rounded-full cursor-pointer">
                            {weather.metadata.location}
                            <RefreshCcw size={20} />
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
                        var Icon = WeatherIcon(item.weather, item.time).icon;
                        return firstIndex == 0 && secondIndex == 0 ? (
                          // jam saat ini
                          <div className="flex items-center justify-between bg-neutral-200 rounded-lg p-4">
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
                                  <span className="text-lg">
                                    {item.precipitation}
                                  </span>
                                  <span className="text-xs">mm</span>
                                </div>
                              </div>
                              <div className="flex gap-1 items-center">
                                <Droplet size={20} />
                                <div className="">
                                  <span className="text-lg">
                                    {item.humidity}
                                  </span>
                                  <span className="text-xs">%</span>
                                </div>
                              </div>
                              <div className="flex gap-1 text-lg items-center">
                                <Thermometer size={20} />
                                {item.temp}°
                              </div>
                            </div>
                          </div>
                        ) : (
                          // selain itu, gunakan tampilan lebih simpel
                          <div
                            onClick={() =>
                              handleOpenDetail(
                                String(firstIndex) + String(secondIndex)
                              )
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
                              <div className="flex gap-1 text-lg items-center">
                                {item.temp}°
                              </div>
                            </div>
                            {openDetail[
                              String(firstIndex) + String(secondIndex)
                            ] == true && (
                              <div
                                key={secondIndex}
                                id={String(firstIndex) + String(secondIndex)}
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
                                  <div title={item.windDir.long}>
                                    {item.windDir.short}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {/* waktu yang akan datang */}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
