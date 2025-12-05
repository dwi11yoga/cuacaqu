// import Link dari react-router-dom untuk pergi ke halaman lain
import { Link } from "react-router-dom";
// icon lucide
import { SunMoon, Calendar, ChevronRight } from "lucide-react";
// menu
export default function Menu() {
  return (
    <div className="border border-r p-2 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <Link to="/" className="rotate-90 mt-10 -mx-2">
          Cuacaqu
        </Link>
        {/* menu */}
        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className="flex flex-col items-center rounded-md p-1.5 hover:bg-blue-100"
          >
            <SunMoon size={30} strokeWidth={1.5} />
            <div className="text-xs">Hari ini</div>
          </Link>
          <Link
            to="/prediksi"
            className="flex flex-col items-center rounded-md p-1.5 hover:bg-blue-100"
          >
            <Calendar strokeWidth={1.5} />
            <div className="text-xs">Prediksi</div>
          </Link>
        </div>
      </div>
      <div className="rounded-md p-1.5 hover:bg-blue-100 cursor-pointer">
        <ChevronRight />
      </div>
    </div>
  );
}
