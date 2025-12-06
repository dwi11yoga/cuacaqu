// import library
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { MapPinPen } from "lucide-react";

// import komponen
import Skeleton from "./Skeleton";

export default function LocationSelector({
  currentVillage,
  setCurrentVillage,
}) {
  // state untuk menampung data lokasi
  const [provinceList, setProvinceList] = useState([]);
  const [regencyList, setRegencyList] = useState([]);
  const [districList, setDistricList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  // lokasi saat ini
  const loc = Cookies.get("location").split(".");
  const [currentProvince, setCurrentProvince] = useState(loc ? loc[0] : "31");
  const [currentRegency, setCurrentRegency] = useState(
    loc ? `${loc[0]}.${loc[1]}` : "31.71"
  );
  const [currentDistric, setCurrentDistric] = useState(
    loc ? `${loc[0]}.${loc[1]}.${loc[2]}` : "31.71.03"
  );
  // data village disimpan pada parent

  // fungsi ambil data dari backend
  async function fetchLocation(code = "") {
    const response = await axios.get(
      `http://localhost:8080/location?code=${code}`
    );
    return response.data;
  }

  // ambil daftar provinsi
  useEffect(() => {
    fetchLocation().then((data) => setProvinceList(data));
  }, []);

  // ambil daftar kabupaten, dijalankan jika isi currentprovince berubah
  useEffect(() => {
    if (!currentProvince) return;
    fetchLocation(currentProvince).then((data) => {
      setRegencyList(data);
      setDistricList([]);
      setVillageList([]);
      // setCurrentRegency("");
      // setCurrentDistric("");
    });
  }, [currentProvince]);

  // ambil data kecamatan, dijalankan saat data kabupaten berubah
  useEffect(() => {
    if (!currentRegency) return;
    fetchLocation(currentRegency).then((data) => {
      setDistricList(data);
      setVillageList([]);
      // setCurrentDistric("");
    });
  }, [currentRegency]);

  // ambil data desa, dijalankan saat data kecamatan berubah
  useEffect(() => {
    if (!currentDistric) return;
    fetchLocation(currentDistric).then((data) => {
      setVillageList(data);
    });
  }, [currentDistric]);

  return (
    <div className="bg-neutral-50 shadow-sm rounded-lg text-black p-4 space-y-2 min-w-56 border border-neutral-200">
      {/* title */}
      <div className="mb-1 flex items-center gap-1">
        <MapPinPen size={20} />
        Ubah lokasi
      </div>

      {/* select provinsi */}
      {provinceList.length > 0 ? (
        <select
          name="selectProvince"
          id="selectProvince"
          value={currentProvince}
          onChange={(e) => {
            setCurrentProvince(e.target.value);
          }}
          className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
        >
          <option value="">Pilih</option>
          {provinceList.map((province) => (
            <option value={province.code}>{province.name}</option>
          ))}
        </select>
      ) : (
        <Skeleton height={"2rem"} />
      )}

      {/* Select kabupaten */}
      {regencyList.length > 0 ? (
        <select
          name="selectRegency"
          id="selectRegency"
          value={currentRegency}
          onChange={(e) => {
            setCurrentRegency(e.target.value);
          }}
          className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
        >
          <option value="">Pilih</option>
          {regencyList.map((regency) => (
            <option value={regency.code}>{regency.name}</option>
          ))}
        </select>
      ) : (
        <Skeleton height={"2rem"} />
      )}

      {/* select kecamatan */}
      {districList.length > 0 ? (
        <select
          name="selectDistric"
          id="selectDistric"
          value={currentDistric}
          onChange={(e) => {
            setCurrentDistric(e.target.value);
          }}
          className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
        >
          <option value="">Pilih</option>
          {districList.map((subDistrics) => (
            <option value={subDistrics.code}>{subDistrics.name}</option>
          ))}
        </select>
      ) : (
        <Skeleton height={"2rem"} />
      )}

      {/* select desa */}
      {villageList.length > 0 ? (
        <select
          name="selectVillage"
          id="selectVillage"
          value={currentVillage}
          onChange={(e) => {
            setCurrentVillage(e.target.value);
          }}
          className="w-full px-3 py-2.5 rounded-md cursor-pointer bg-white border border-neutral-300"
        >
          <option value="">Pilih</option>
          {villageList.map((village) => (
            <option value={village.code}>{village.name}</option>
          ))}
        </select>
      ) : (
        <Skeleton height={"2rem"} />
      )}
    </div>
  );
}
