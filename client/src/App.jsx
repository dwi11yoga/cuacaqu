import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import WeatherPrediction from "./WeatherPredictions";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediksi" element={<WeatherPrediction />}></Route>
      </Routes>
    </Router>
  );
}
