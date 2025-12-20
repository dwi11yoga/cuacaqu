import "./App.css";

// komponen
import Navbar from "./components/Navbar";
// import data pemilik foto
import {
  sunnyImages,
  cloudyImages,
  foggyImages,
  rainyImages,
} from "./data/WeatherImages";

export default function About() {
  // set title untuk halaman ini
  const pageTitle = "Tentang";
  document.title = `${pageTitle} | Cuacaqu`;

  // gabungkan data-data gambar ke dalam satu.
  const data = sunnyImages.concat(cloudyImages, foggyImages, rainyImages);

  return (
    <>
      {/* navbar */}
      <Navbar title={pageTitle} />
      <div className="flex bg-neutral-50">
        <div className="grid grid-cols-4 my-8 w-full">
          <div className=""></div>
          {/* Konten */}
          <div className="md:col-span-2 col-span-4 md:mx-0 md:m-0 m-[3vh] md:mt-0 mt-16 mb-0">
            <div className="mb-5">
              <h1 className="font-bold text-3xl mb-7">Tentang</h1>

              <div className="space-y-4 ">
                <p>
                  Cuacaqu adalah sebuah aplikasi web prediksi cuaca yang
                  dirancang untuk memberikan informasi cuaca yang akurat, cepat,
                  dan mudah dipahami. Aplikasi ini memanfaatkan API{" "}
                  <ExternalLink
                    url={"https://data.bmkg.go.id/prakiraan-cuaca/"}
                    text={"Data Prakiraan Cuaca Terbuka BMKG"}
                  />
                  &nbsp;untuk menyediakan data cuaca real-time dan terpercaya,
                  serta menggunakan{" "}
                  <ExternalLink
                    url={"https://wilayah.id/"}
                    text={
                      "API Data Wilayah Administrasi Pemerintahan di Indonesia"
                    }
                  />
                  &nbsp; untuk menghadirkan daftar wilayah hingga level desa
                  secara lengkap. Dengan tampilan modern serta navigasi yang
                  sederhana, Cuacaqu membantu pengguna mengetahui kondisi cuaca
                  di lokasi mana pun di Indonesia, termasuk hingga ke tingkat
                  desa.
                </p>
                <p>
                  Dibangun menggunakan Node.js, Express.js, dan React.js,
                  Cuacaqu menawarkan performa tinggi sekaligus pengalaman
                  pengguna yang mulus dan responsif. Aplikasi ini juga
                  memanfaatkan paket ikon{" "}
                  <ExternalLink url={"https://lucide.dev/"} text={"Lucide"} />
                  &nbsp; sehingga tampilan icon menjadi lebih bersih, konsisten,
                  dan profesional. Halaman “Cuaca Hari Ini” menyajikan detail
                  kondisi saat ini seperti suhu, kelembapan, curah hujan,
                  kecepatan angin, serta informasi visual yang mudah dipahami.
                  Sementara itu, halaman “Prediksi Cuaca” menampilkan prakiraan
                  kondisi untuk 2–3 hari ke depan, membantu pengguna
                  merencanakan aktivitas harian secara lebih aman dan nyaman.
                </p>
                <p>
                  Gambar yang digunakan milik: <br />
                  {data.map((item, index) => (
                    <>
                      {index == data.length - 1 ? "dan " : ""}
                      <ExternalLink
                        url={item.backgroundURL}
                        text={item.owner}
                      />
                      {index == data.length - 1 ? "." : ", "}
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}

function ExternalLink({ url, text }) {
  return (
    <>
      <a
        className="underline underline-offset-4 decoration-4 decoration-blue-400 hover:decoration-blue-700"
        target="_blank"
        href={url}
      >
        {text}
      </a>
    </>
  );
}
