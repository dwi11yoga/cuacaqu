// data gambar yang akan digunakan dalam halaman home

export default function getWeatherImage(weather, randomNumber) {
  // data gambar
  const sunny = sunnyImages;
  const cloudy = cloudyImages;
  const foggy = foggyImages;
  const rainy = rainyImages;

  //   lakukan fungsi
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

export const sunnyImages = [
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

export const cloudyImages = [
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

export const foggyImages = [
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

export const rainyImages = [
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
