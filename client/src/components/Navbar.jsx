import { useState } from "react";
// import Link dari react-router-dom untuk pergi ke halaman lain
import { Link } from "react-router-dom";
// icon lucide
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Info,
  SlidersHorizontal,
  Sun,
  Menu,
  X,
} from "lucide-react";

// menu navbar
export default function Navbar({ title }) {
  const [extended, setExtended] = useState(false);
  // fungsi mengubah navbar menjadi extended
  function handleExtendedNavbar() {
    setExtended(!extended);
  }

  return (
    <>
      {extended ? (
        <ExtendedNavbar
          title={title}
          handleExtendedNavbar={handleExtendedNavbar}
        />
      ) : (
        <NormalNavbar title={title} handleExtendedNavbar={handleExtendedNavbar} />
      )}
      <MobileNavbar title={title} />
    </>
  );
}

// navbar extended
function ExtendedNavbar({ title, handleExtendedNavbar }) {
  // layout link
  // eslint-disable-next-line no-unused-vars
  function LinkLayout({ url, id, name, Icon }) {
    return (
      <Link
        to={url}
        className={`flex items-center rounded-md py-3 px-3 space-x-2 ${
          title == id ? "bg-neutral-800" : ""
        } hover:bg-neutral-700`}
      >
        <Icon strokeWidth={1.5} />
        <div className="">{name}</div>
      </Link>
    );
  }

  return (
    <nav className="fixed bg-neutral-900 text-white p-5 flex flex-col justify-between h-screen w-64 z-50">
      <div className="">
        <Link to="/" className="">
          Cuacaqu
        </Link>
        {/* menu */}
        <div className="mt-10 space-y-1.5">
          <MenuList LinkLayout={LinkLayout} />
        </div>
      </div>
      <div
        onClick={handleExtendedNavbar}
        className="rounded-md p-1.5 -mb-3 flex items-center gap-2 hover:bg-neutral-700 cursor-pointer"
      >
        <ChevronLeft />
        Sembunyikan
      </div>
    </nav>
  );
}

// navbar kecil (normal)
function NormalNavbar({ title, handleExtendedNavbar }) {
  // tampilan link
  // eslint-disable-next-line no-unused-vars
  function LinkLayout({ url, id, shortName, Icon }) {
    return (
      <Link
        to={url}
        className={`flex flex-col items-center rounded-md p-1.5 ${
          title == id ? "bg-neutral-800" : ""
        } hover:bg-neutral-700`}
      >
        <Icon strokeWidth={1.5} />
        <div className="text-xs">{shortName}</div>
      </Link>
    );
  }
  return (
    <nav className="fixed hidden md:flex flex-col items-center justify-between bg-neutral-900 text-white p-2 h-screen z-50">
      <div className="flex flex-col items-center">
        <Link to="/" className="rotate-90 mt-10 -mx-2">
          Cuacaqu
        </Link>
        {/* menu */}
        <div className="mt-10 space-y-4">
          <MenuList LinkLayout={LinkLayout} />
        </div>
      </div>
      <div
        title="Perlebar menu"
        onClick={handleExtendedNavbar}
        className="rounded-md p-1.5 hover:bg-neutral-700 cursor-pointer"
      >
        <ChevronRight />
      </div>
    </nav>
  );
}

// tampilan navbar mobile
function MobileNavbar({ title }) {
  const [sidePanel, setSidePanel] = useState(false);
  // tampilan link
  // eslint-disable-next-line no-unused-vars
  function LinkLayout({ url, id, name, Icon }) {
    return (
      <Link
        to={url}
        className={`flex items-center rounded-md py-3 px-3 space-x-2 ${
          title == id ? "bg-neutral-200" : ""
        } hover:bg-neutral-300`}
      >
        <Icon strokeWidth={1.5} />
        <div className="">{name}</div>
      </Link>
    );
  }

  return (
    <nav className="fixed md:hidden flex items-center justify-between bg-neutral-50 shadow-sm w-full p-4 z-50">
      <div className="text-lg">Cuacaqu</div>
      <div
        onClick={() => setSidePanel(true)}
        className="hover:bg-neutral-300 p-1.5 rounded-md cursor-pointer"
      >
        <Menu size={20} />
      </div>

      {/* menu */}
      <div
        className={`bg-neutral-50 shadow-sm fixed h-full w-3/4 top-0 py-4 px-5 space-y-4 transition-all duration-300 ${
          sidePanel ? "right-0" : "-right-full"
        }`}
      >
        <div className="flex justify-end">
          <div
            onClick={() => setSidePanel(false)}
            className="hover:bg-neutral-300 p-1.5 rounded-md cursor-pointer"
          >
            <X size={20} />
          </div>
        </div>
        <div className="space-y-2">
          <MenuList LinkLayout={LinkLayout} />
        </div>
      </div>
    </nav>
  );
}

// Daftar menu
// eslint-disable-next-line no-unused-vars
function MenuList({ LinkLayout }) {
  return (
    <>
      {/* cuaca hari ini */}
      <LinkLayout
        url={"/"}
        id={"Cuaca hari ini"}
        name={"Cuaca hari ini"}
        shortName={"Hari ini"}
        Icon={Sun}
      />
      {/* prediksi */}
      <LinkLayout
        url={"/prediksi"}
        id={"Prediksi cuaca"}
        name={"Prediksi cuaca"}
        shortName={"Prediksi"}
        Icon={Calendar}
      />
      {/* tentang */}
      <LinkLayout
        url={"/tentang"}
        id={"Tentang"}
        name={"Tentang"}
        shortName={"Tentang"}
        Icon={Info}
      />
    </>
  );
}
