import React, { useMemo } from "react";
import Plot from "react-plotly.js";

export default function GujaratTopography() {
  // Generate grid and data only once
  const { LAT, LON, elevation } = useMemo(() => {
    const lat = Array.from({ length: 100 }, (_, i) => 20 + (4.7 * i) / 99); // 20°N–24.7°N
    const lon = Array.from({ length: 100 }, (_, i) => 68.5 + (6 * i) / 99); // 68.5°E–74.5°E

    const LAT = [];
    const LON = [];
    const elevation = [];

    for (let i = 0; i < lon.length; i++) {
      const rowLAT = [];
      const rowLON = [];
      const rowElev = [];
      for (let j = 0; j < lat.length; j++) {
        const LATval = lat[j];
        const LONval = lon[i];
        const elev =
          1200 * Math.exp(-((LATval - 21) ** 2 + (LONval - 70) ** 2) / 1.0) +
          900 * Math.exp(-((LATval - 23) ** 2 + (LONval - 72) ** 2) / 0.8) +
          500 * Math.exp(-((LATval - 22.5) ** 2 + (LONval - 73.5) ** 2) / 0.5) +
          Math.random() * 50; // noise
        rowLAT.push(LATval);
        rowLON.push(LONval);
        rowElev.push(elev);
      }
      LAT.push(rowLAT);
      LON.push(rowLON);
      elevation.push(rowElev);
    }

    return { LAT, LON, elevation };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Plot
        data={[
          {
            type: "surface",
            x: LAT,
            y: LON,
            z: elevation,
            colorscale: "Plasma",
            colorbar: { title: "Elevation (m)" },
          },
        ]}
        layout={{
          title: "Topography of Gujarat",
          autosize: true,
          width: 800,
          height: 600,
          margin: { l: 40, r: 40, b: 40, t: 60 },
          scene: {
            xaxis: { title: "Latitude (°N)" },
            yaxis: { title: "Longitude (°E)" },
            zaxis: { title: "Elevation (m)", nticks: 8, range: [0, 1500] },
          },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}
