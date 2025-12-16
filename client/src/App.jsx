import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import WeatherPrediction from "./WeatherPredictions";
import About from "./About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediksi" element={<WeatherPrediction />}></Route>
        <Route path="/tentang" element={<About />}></Route>
      </Routes>
    </Router>
  );
}
