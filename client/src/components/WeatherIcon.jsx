import {
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSun,
  CloudMoon,
  Droplet,
  Wind,
  Umbrella,
  Eye,
  Compass,
  Sun,
  Loader,
  Info,
  Moon,
  Cloudy,
  CloudFog,
  CloudRainWind,
  CloudHail,
  CloudLightning,
  SunMoon,
  Calendar,
  ChevronRight,
  MapPinPen,
  Zap,
} from "lucide-react";

// fungsi memilih ikon cuaca
export default function weatherCodeConversion(weather, hour) {
  const areNoon = hour >= 6 && hour < 18;

  switch (weather) {
    case "Cerah":
      return {
        desc: weather,
        icon: areNoon ? Sun : Moon,
      };
    case "Cerah Berawan":
      return {
        desc: weather,
        icon: areNoon ? CloudSun : CloudMoon,
      };
    case "Berawan":
      return {
        desc: weather,
        icon: Cloud,
      };
    case "Berawan Tebal":
      return {
        desc: weather,
        icon: Cloudy,
      };
    case "Asap":
      return {
        desc: weather,
        icon: CloudFog,
      };
    case "Kabut":
      return {
        desc: weather,
        icon: CloudFog,
      };
    case "Hujan Ringan":
      return {
        desc: weather,
        icon: CloudDrizzle,
      };
    case "Hujan Sedang":
      return {
        desc: weather,
        icon: CloudRain,
      };
    case "Hujan Lebat":
      return {
        desc: weather,
        icon: CloudRainWind,
      };
    case "Hujan Lokal":
      return {
        desc: weather,
        icon: CloudHail,
      };

    case "Petir":
      return {
        desc: weather,
        icon: Zap,
      };
    case "Hujan Petir":
      return {
        desc: weather,
        icon: CloudLightning,
      };
    case "Hujan Badai":
      return {
        desc: weather,
        icon: CloudLightning,
      };
    default:
      return {
        desc: "...",
        icon: Loader,
      };
  }
}
