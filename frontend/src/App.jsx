import React from 'react';
import StationNavigator from './components/StationNavigator';
import PrismaticBurst from './components/PrismaticBurst';
import StoryJourney from './pages/StoryJourney';
import WildfireStory from './pages/WildfireStory';
import GalacticStory from './pages/GalacticStory';

import LandingPage from './pages/LandingPage';
function App() {
  return (
    <>

    {/* <LandingPage /> */}
      {/* <StationNavigator /> */}
      {/* <StoryJourney /> */}
      <WildfireStory />

      {/* <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
  <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={1.0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={24}
    mixBlendMode="lighten"
    colors={['#ff007a', '#4d3dff', '#ffffff']}
  />
</div> */}
    </>
  );
}

export default App;