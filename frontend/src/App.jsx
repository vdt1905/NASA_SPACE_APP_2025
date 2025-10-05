import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StationNavigator from './components/StationNavigator';
import PrismaticBurst from './components/PrismaticBurst';
import WildfireStory from './pages/WildfireStory';
import SurfaceTemp from './components/SurfaceTemp';

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
       
        <Route path="/pollution" element={<PollutionPage />} />
        <Route path="/solarflux" element={<SolarFlux />} />
        <Route path="/deforestation" element={<DeforestationStory />} />
        <Route path="/:stationId" element={<WildfireStory />} />

        <Route path="/wildfire" element={<WildfireStory />} />
        <Route path="/ndvi" element={<DeforestationStory />} />
        <Route path="/aster" element={<SurfaceTempPage />} />
        <Route path="/aerosol" element={<PollutionPage />} />
        <Route path="/radiation" element={<SolarFlux />} />
        <Route path="/cloud" element={<SurfaceTemp />} />


      </Routes>
    </Router>
  );
}

export default App;
