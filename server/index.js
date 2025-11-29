// import express
const express = require("express");
const app = express();
const axios = require("axios");

// import cors -> agar frontend bisa mendapat data yang dikirim oleh backend
const cors = require("cors");
const corsOption = {
  origin: "http://localhost::5173/",
};
app.use(cors(corsOption));

app.get("/api", (req, res) => {
  res.json({
    fruits: ["apple", "orange", "banana"],
  });
});

// untuk halaman today
app.get("/weather-today", async (req, res) => {
  try {
    // dapatkan data dari api
    const response = await axios.get(
      "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=33.18.13.2007"
    );

    // proses data
    const weatherData = response.data.data[0].cuaca;
    // kirim metadata
    const metadata = {
      shortLocation: `${response.data.lokasi.kecamatan}, ${response.data.lokasi.kotkab}`,
      longLocation: `${response.data.lokasi.desa}, ${response.data.lokasi.kecamatan}, ${response.data.lokasi.kotkab}`,
      // tanggal analisis
      analysisDate: new Date(
        weatherData[0][0].analysis_date
      ).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    // dapatkan detail suhu
    // ubah nama arah angin ke indonesia
    function translateCompass(windDirection) {
      switch (windDirection) {
        case "E":
          return "Timur";
        case "SE":
          return "Tenggara";
        case "S":
          return "Selatan";
        case "SW":
          return "Barat Daya";
        case "W":
          return "Barat";
        case "NW":
          return "Barat Laut";
        case "N":
          return "Utara";
        case "NE":
          return "Timur Laut";
        default:
          return windDir;
      }
    }

    const today = {
      // kondisi cuaca
      weather: weatherData[0][0].weather_desc,
      // suhu
      temp: weatherData[0][0].t,
      // kelembapan
      humidity: weatherData[0][0].hu,
      // jarak pandang
      visibility: weatherData[0][0].vs_text.replace(" ", "").replace(" km", ""),
      // curah hujan
      precipitation: weatherData[0][0].tp,
      // tutupan awan
      cloudCover: weatherData[0][0].tcc,
      // kecepatan angin
      windSpeed: weatherData[0][0].ws,
      // arah angin
      windDir: translateCompass(weatherData[0][0].wd),
    };

    // cuaca yang akan datang
    // gabungkan cuaca hari ini dan besok
    const combinedWeatherData = weatherData[0].concat(weatherData[1]);
    // kemudian ambil 5 data paling awal (kecuali data 0)
    // kemudian ambil data yang diperlukan pakai map()
    const upcomingHour = combinedWeatherData.slice(1, 6).map((item) => ({
      // ubah waktu jadi waktu lokal
      time: new Date(item.datetime).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      weather: item.weather_desc,
      temp: item.t,
    }));

    // Data curah hujan (untuk grafik)
    const precipitation = combinedWeatherData.slice(0, 5).map((item) => ({
      // ubah waktu jadi waktu lokal
      time: new Date(item.datetime).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      precipitation: item.tp,
    }));

    // perkiraan cuaca 2 hari kedepan
    function weatherForecast(data) {
      const date = new Date(data[0].datetime).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
      const minTemp = Math.min(...data.map((item) => item.t));
      const maxTemp = Math.max(...data.map((item) => item.t));
      // hitung nilai semua precipitation dalam array data, kemudian kurangi 0 dibelakang koma dengan toFixed
      const precipitationTotal = data
        .reduce((sum, item) => sum + item.tp, 0)
        .toFixed(2);

      // cari cuaca yang paling sering muncul pada hari tersebut
      var weatherFrequency = {};
      data.forEach((item) => {
        weatherFrequency[item.weather_desc] =
          (weatherFrequency[item.weather_desc] || 0) + 1;
      });
      // ambil nilai paling sering muncul
      const weather = Object.keys(weatherFrequency).reduce((a, b) =>
        weatherFrequency[a] > weatherFrequency[b] ? a : b
      );

      return {
        date,
        minTemp,
        maxTemp,
        precipitationTotal,
        weather,
      };
    }

    const weatherTomorrow = weatherForecast(weatherData[1]);
    const weatherAfterTomorrow = weatherForecast(weatherData[2]);
    const upcomingDays = [weatherTomorrow, weatherAfterTomorrow];

    res.json({
      metadata,
      today,
      upcomingHour,
      precipitation,
      upcomingDays,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// run app
const port = 8080;
app.listen(port, () => {
  console.log(`server dimulai pada port ${port}`);
  console.log(`alamat: http://localhost:${port}`);
});
