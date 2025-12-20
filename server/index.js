// import express
const express = require("express");
const app = express();
const axios = require("axios");

// import cors -> agar frontend bisa mendapat data yang dikirim oleh backend
const cors = require("cors");
const corsOption = {
  origin: "http://localhost:5173/",
  credentials: true
};
app.use(cors(corsOption));
// app.use(cors());

// untuk halaman today
app.get("/weather-today", async (req, res) => {
  try {
    // jika fontend mengirim kode lokasi, gunakan. jika tidak, gunakan kode kemayoran, jakpus
    const adm4 = (req.query.code || "").replaceAll('"', "");
    let url = "";
    if (adm4 && adm4.split(".").length === 4) {
      url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`;
    } else {
      url = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.03.1001";
    }

    // dapatkan data dari api
    const response = await axios.get(url);

    // proses data
    const weatherData = response.data.data[0].cuaca;
    // kirim metadata
    const metadata = {
      location: `${response.data.lokasi.kecamatan}, ${response.data.lokasi.kotkab}`,
      // tanggal analisis
      analysisDate: new Date(
        weatherData[0][0].analysis_date
      ).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
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
    const upcomingHour = combinedWeatherData.slice(0, 5).map((item) => ({
      // ubah waktu jadi waktu lokal
      time: new Date(item.datetime).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      weather: item.weather_desc,
      temp: item.t,
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
      upcomingDays,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fungsi untuk mendapat data prediksi cuaca
app.get("/weather-prediction", async (req, res) => {
  try {
    const adm4 = (req.query.code || "").replaceAll('"', "");
    let url = "";
    if (adm4 && adm4.split(".").length === 4) {
      url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`;
    } else {
      url = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.03.1001";
    }

    // ambil data perkiraan cuaca dari api bmkg
    const response = await axios.get(url);

    // PROSES DATA
    const data = response.data;
    // dapatkan metadata
    // kirim metadata
    const metadata = {
      location: `${data.lokasi.kecamatan}, ${data.lokasi.kotkab}`,
      // tanggal analisis
      analysisDate: new Date(
        data.data[0].cuaca[0][0].analysis_date
      ).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    // filter data cuaca hari ini dan beberapa hari kedepan
    function translateCompass(windDirection) {
      switch (windDirection) {
        case "E":
          return {
            short: "T",
            long: "Timur",
          };
        case "SE":
          return {
            short: "TG",
            long: "Tenggara",
          };
        case "S":
          return {
            short: "S",
            long: "Selatan",
          };
        case "SW":
          return {
            short: "BD",
            long: "Barat Daya",
          };
        case "W":
          return {
            short: "B",
            long: "Barat",
          };
        case "NW":
          return {
            short: "BL",
            long: "Barat Laut",
          };
        case "N":
          return {
            short: "U",
            long: "Utara",
          };
        case "NE":
          return {
            short: "TL",
            long: "Timur Laut",
          };
        default:
          return windDir;
      }
    }

    const prediction = data.data[0].cuaca.map((day) =>
      day.map((item) => ({
        date: new Date(item.datetime).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        }),
        time: new Date(item.datetime).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        weather: item.weather_desc,
        temp: item.t,
        humidity: item.hu,
        precipitation: item.tp,
        visibility: item.vs_text.replace(" ", "").replace(" km", ""),
        cloudCover: item.tcc,
        windSpeed: item.ws,
        windDir: translateCompass(item.wd),
      }))
    );

    // kirim data ke frontend
    res.json({
      // data,
      metadata,
      prediction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fungsi untuk mendapat data wilayah indonesia
app.get("/location", async (req, res) => {
  try {
    // dapatkan kode yang didapat oleh pengguna
    const code = req.query.code.replaceAll('"', "") || "";

    var url = "";
    if (code === "") {
      // berarti mengambil data provinsi
      url = "https://wilayah.id/api/provinces.json";
    } else if (code.split(".").length === 1) {
      // berarti mengambil data kabupaten
      url = `https://wilayah.id/api/regencies/${code}.json`;
    } else if (code.split(".").length === 2) {
      // berarti mengambil data kecamatan
      url = `https://wilayah.id/api/districts/${code}.json`;
    } else if (code.split(".").length === 3) {
      // berarti mengambil data kecamatan
      url = `https://wilayah.id/api/villages/${code}.json`;
    }

    const response = await axios.get(url);
    res.json(response.data.data);
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
