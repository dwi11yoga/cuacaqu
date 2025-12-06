import { useState } from "react";
// import Link dari react-router-dom untuk pergi ke halaman lain
import { Link } from "react-router-dom";
// icon lucide
import {
  SunMoon,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Info,
} from "lucide-react";

// menu navbar
export default function Navbar({ title }) {
  const [extended, setExtended] = useState(false);
  // fungsi mengubah navbar menjadi extended
  function handleExtendedNavbar() {
    setExtended(!extended);
  }

  return extended ? (
    <ExtendedNavbar title={title} handleExtendedNavbar={handleExtendedNavbar} />
  ) : (
    <NormalNavbar title={title} handleExtendedNavbar={handleExtendedNavbar} />
  );
}

// navbar extended
function ExtendedNavbar({ title, handleExtendedNavbar }) {
  return (
    <nav className="fixed bg-neutral-50 border border-r p-5 flex flex-col justify-between h-screen w-64 z-50">
      <div className="">
        <Link to="/" className="">
          Cuacaqu
        </Link>
        {/* menu */}
        <div className="mt-10 space-y-2">
          <Link
            to="/"
            className={`flex items-center rounded-md py-2 px-3 space-x-2 ${
              title == "Cuaca hari ini" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <SunMoon size={30} strokeWidth={1.5} />
            <div className="">Cuaca hari ini</div>
          </Link>

          {/* prediksi */}
          <Link
            to="/prediksi"
            className={`flex items-center rounded-md py-2 px-3 space-x-2 ${
              title == "Prediksi cuaca" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <Calendar strokeWidth={1.5} />
            <div className="">Prediksi cuaca</div>
          </Link>

          {/* tentang */}
          <Link
            to="#"
            className={`flex items-center rounded-md py-2 px-3 space-x-2 ${
              title == "Tentang" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <Info strokeWidth={1.5} />
            <div className="">Tentang</div>
          </Link>
        </div>
      </div>
      <div
        onClick={handleExtendedNavbar}
        className="rounded-md p-1.5 -mb-3 flex items-center gap-2 hover:bg-blue-200 cursor-pointer"
      >
        <ChevronLeft />
        Sembunyikan
      </div>
    </nav>
  );
}

// navbar kecil (normal)
function NormalNavbar({ title, handleExtendedNavbar }) {
  return (
    <nav className="fixed bg-neutral-50 border border-r p-2 flex flex-col items-center justify-between h-screen z-50">
      <div className="flex flex-col items-center">
        <Link to="/" className="rotate-90 mt-10 -mx-2">
          Cuacaqu
        </Link>
        {/* menu */}
        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className={`flex flex-col items-center rounded-md p-1.5 ${
              title == "Cuaca hari ini" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <SunMoon size={30} strokeWidth={1.5} />
            <div className="text-xs">Hari ini</div>
          </Link>
          {/* halaman prediksi */}
          <Link
            to="/prediksi"
            className={`flex flex-col items-center rounded-md p-1.5 ${
              title == "Prediksi cuaca" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <Calendar strokeWidth={1.5} />
            <div className="text-xs">Prediksi</div>
          </Link>
          {/* Halaman tentang */}
          <Link
            to="/prediksi"
            className={`flex flex-col items-center rounded-md p-1.5 ${
              title == "Tentang" ? "bg-blue-100" : ""
            } hover:bg-blue-200`}
          >
            <Info strokeWidth={1.5} />
            <div className="text-xs">Tentang</div>
          </Link>
        </div>
      </div>
      <div
        title="Perlebar menu"
        onClick={handleExtendedNavbar}
        className="rounded-md p-1.5 hover:bg-blue-200 cursor-pointer"
      >
        <ChevronRight />
      </div>
    </nav>
  );
}
