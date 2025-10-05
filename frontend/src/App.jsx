import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StationNavigator from './components/StationNavigator';
import PrismaticBurst from './components/PrismaticBurst';
import WildfireStory from './pages/WildfireStory';
import SurfaceTemp from './components/SurfaceTemp';
import KeplerMap from './components/KeplerMap';
import SurfaceTempPage from './pages/SurfaceTempPage';
import PollutionPage from './pages/PollutionPage';
import SolarFlux from './pages/SolarFlux';
import DeforestationStory from './pages/DeforestationStory';
// import LandingPage from './pages/LandingPage'; // if you have one

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Default route */}
        <Route path="/" element={<WildfireStory />} />
        {/* Other Pages */}
        <Route path="/station" element={<StationNavigator />} />
        <Route path="/surface-temp" element={<SurfaceTemp />} />
        <Route path="/surface-temp-page" element={<SurfaceTempPage />} />
        <Route path="/kepler-map" element={<KeplerMap />} />
        <Route path="/pollution" element={<PollutionPage />} />
        <Route path="/solarflux" element={<SolarFlux />} />
        <Route path="/deforestation" element={<DeforestationStory />} />
      </Routes>
    </Router>
  );
}

export default App;
