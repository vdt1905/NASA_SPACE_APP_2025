import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StationNavigator from './components/StationNavigator';
import PrismaticBurst from './components/PrismaticBurst';
import WildfireStory from './pages/WildfireStory';
import SurfaceTemp from './components/SurfaceTemp';
import GujaratTopography from './components/GujaratTopology';
import SurfaceTempPage from './pages/SurfaceTempPage';
import PollutionPage from './pages/PollutionPage';
import SolarFlux from './pages/SolarFlux';
import DeforestationStory from './pages/DeforestationStory';
import StereoImageFilter from './components/StereoImageFilter';
import TopologyStory from './pages/TopologyStory';
// import LandingPage from './pages/LandingPage'; // if you have one

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Default route */}
        <Route path="/" element={<WildfireStory />} />
        <Route path="/guj" element={<GujaratTopography />} />        

        {/* Other Pages */}
        <Route path="/station" element={<StationNavigator />} />
        <Route path="/surface-temp" element={<SurfaceTemp />} />
        <Route path="/surface-temp-page" element={<SurfaceTempPage />} />
        <Route path="/image" element={<StereoImageFilter
      src="/images/filter.jpg"   // put the image in /public/images
      aspect={797/737}                  // exact H/W keeps the perfect ratio
      startSplit={50}
    />} />
       
        <Route path="/pollution" element={<PollutionPage />} />
        <Route path="/topology" element={<TopologyStory />} />
        

       
        <Route path="/deforestation" element={<DeforestationStory />} />
        <Route path="/wildfire" element={<WildfireStory />} />
        <Route path="/ndvi" element={<DeforestationStory />} />
        <Route path="/aster" element={<SurfaceTempPage />} />
        <Route path="/aerosol" element={<PollutionPage />} />
        <Route path="/radiation" element={<TopologyStory />} />

      </Routes>
    </Router>
  );
}

export default App;
