import "./App.css";

// komponen
import Navbar from "./components/Navbar";

export default function About() {
  const urlStyle =
    "underline underline-offset-4 decoration-4 decoration-blue-400 hover:decoration-blue-700";
  return (
    <div className="flex bg-neutral-50">
      <Navbar title={"Tentang"} />

      {/* konten */}

      <div className="grid grid-cols-4 my-8 w-full">
        <div className=""></div>
        {/* Konten */}
        <div className="col-span-2">
          <div className="mb-5">
            <h1 className="font-bold text-3xl mb-7">Tentang</h1>

            <div className="space-y-4 ">
              <p>
                Cuacaqu adalah sebuah aplikasi web prediksi cuaca yang dirancang
                untuk memberikan informasi cuaca yang akurat, cepat, dan mudah
                dipahami. Aplikasi ini memanfaatkan API{" "}
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://data.bmkg.go.id/prakiraan-cuaca/"
                >
                  Data Prakiraan Cuaca Terbuka BMKG
                </a>
                &nbsp;untuk menyediakan data cuaca real-time dan terpercaya,
                serta menggunakan{" "}
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://wilayah.id/"
                >
                  API Data Wilayah Administrasi Pemerintahan di Indonesia
                </a>{" "}
                untuk menghadirkan daftar wilayah hingga level desa secara
                lengkap. Dengan tampilan modern serta navigasi yang sederhana,
                Cuacaqu membantu pengguna mengetahui kondisi cuaca di lokasi
                mana pun di Indonesia, termasuk hingga ke tingkat desa.
              </p>
              <p>
                Dibangun menggunakan Node.js, Express.js, dan React.js, Cuacaqu
                menawarkan performa tinggi sekaligus pengalaman pengguna yang
                mulus. Aplikasi ini juga memanfaatkan paket ikon{" "}
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://lucide.dev/"
                >
                  Lucide
                </a>{" "}
                sehingga tampilan icon menjadi lebih bersih, konsisten, dan
                profesional. Halaman “Cuaca Hari Ini” menyajikan detail kondisi
                saat ini seperti suhu, kelembapan, curah hujan, kecepatan angin,
                serta informasi visual yang mudah dipahami. Sementara itu,
                halaman “Prediksi Cuaca” menampilkan prakiraan kondisi untuk 2–3
                hari ke depan, membantu pengguna merencanakan aktivitas harian
                secara lebih aman dan nyaman.
              </p>
              <p>
                Selain fitur inti, Cuacaqu juga dilengkapi dark mode, opsi untuk
                mengganti satuan suhu (°C / °F), serta tampilan yang responsif
                sehingga tetap nyaman diakses dari smartphone, tablet, maupun
                komputer.
              </p>
              <p>
                Gambar yang digunakan milik: <br />
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/brown-concrete-monument-near-body-of-water-during-daytime-9U283eOPeBk"
                >
                  Rival Sitorus
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/man-in-white-dress-shirt-standing-near-glass-window-CkKPsmEsv-E"
                >
                  Eugenia Clara
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-view-of-the-ocean-from-the-top-of-a-building-svunmtYr85o"
                >
                  Julio Samudra
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/architectural-detail-of-a-modern-building-against-a-blue-sky-gm-zY_6p2vw"
                >
                  Defrino Maasy
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-nEVZd2Z-2i0"
                >
                  Marthn Luther
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-lush-green-field-with-a-small-village-in-the-distance-z8-pbb3RTjs"
                >
                  Liliia
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-large-cloud-in-the-sky-with-a-plane-flying-by-lRmIu1k7ZOM"
                >
                  Affan Fadhlan
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-tall-building-with-a-weather-vane-on-top-of-it-8Nls6N3xPgU"
                >
                  Affan Fadhlan
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-serene-lake-surrounded-by-lush-green-hills-pk1i_eBzQ1A"
                >
                  Bastian Ragas
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/an-aerial-view-of-a-cityscape-under-a-cloudy-sky-ygAE99gQ1uo"
                >
                  David Kristianto
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/thatch-buildings-on-grass-field-during-day-E7Ef4iBfwMc"
                >
                  Marcella Oscar
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/green-trees-near-mountain-under-white-clouds-during-daytime-hDr6k9UNOcA"
                >
                  Anatliy Shostak
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-foggy-valley-with-trees-and-mountains-in-the-distance-z3WHMGaSP4w"
                >
                  Just Meg
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-curve-in-the-road-with-power-lines-above-it-82vWF-9X4oc"
                >
                  Ebenhaezer Kambuaya
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-foggy-road-curves-around-a-tall-tree-2e50qjlXf8o"
                >
                  Daffa Umar
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-black-and-white-photo-of-a-foggy-forest-lMZVvwnjHH4"
                >
                  Joshua Kettle{" "}
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/selective-focus-photo-of-yellow-petaled-flower-chrySQDSOvI"
                >
                  Bady Abbas
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/misty-city-landscape-with-trees-and-a-building--lFxWDNyylA"
                >
                  Safuan Safuan
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/black-bicycle-parked-beside-green-plants-during-daytime-EOzxYQ_nY1U"
                >
                  Bima Diego Pradipta
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-rain-soaked-park-with-benches-and-trees-cAU4UbGE5Vk"
                >
                  Edo Rahayu
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/person-riding-motorcycle-M4z2FGRJbeA"
                >
                  Mohamed Jamil Latrach
                </a>
                ,&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-colorful-umbrella-sitting-on-top-of-a-wet-ground-iDdR_XEq0Vs"
                >
                  Jody
                </a>
                , dan&nbsp;
                <a
                  className={urlStyle}
                  target="_blank"
                  href="https://unsplash.com/photos/a-foggy-city-street-with-cars-driving-on-it-UTUPRQRAoQY"
                >
                  Jakarta Addicted
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
