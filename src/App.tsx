import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import MovieDetail from "./pages/movieDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}
