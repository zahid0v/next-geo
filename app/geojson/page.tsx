// // Using Mapbox
// "use client"
// import * as React from 'react';
// import {useState, useEffect, useMemo, useCallback} from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import ControlPanel from './control-panel';
// import Map, {Source, Layer} from 'react-map-gl/mapbox';
// import { MapLayerMouseEvent } from 'mapbox-gl';
// import {dataLayer} from './map-style';
// import {updatePercentiles} from './utils';

// export default function Page() {
//     const [year, setYear] = useState(2015);
//     const [allData, setAllData] = useState(null);
//     const [hoverInfo, setHoverInfo] = useState(null);
  
//     useEffect(() => {
//       /* global fetch */
//       fetch(
//         'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
//       )
//         .then(resp => resp.json())
//         .then(json => setAllData(json))
//         .catch(err => console.error('Could not load data', err)); // eslint-disable-line
//     }, []);
  
//     const onHover = useCallback((event: MapLayerMouseEvent)=> {
//       const {
//         features,
//         point: {x, y}
//       } = event;
//       const hoveredFeature = features && features[0];
  
//       // prettier-ignore
//       setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
//     }, []);
  
//     const data = useMemo(() => {
//       return allData && updatePercentiles(allData, f => f.properties.income[year]);
//     }, [allData, year]);


//   return (
//     <>
//     <Map
//     initialViewState={{
//       latitude: 40,
//       longitude: -100,
//       zoom: 3
//     }}
//     style={{width: "100vw", height: "100vh"}}
//     mapStyle="mapbox://styles/mapbox/light-v9"
//     mapboxAccessToken="pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg"
//     interactiveLayerIds={['data']}
//     onMouseMove={onHover}
//   >
//     <Source type="geojson" data={data}>
//       <Layer {...dataLayer} />
//     </Source>
//     {hoverInfo && (
//       <div className="absolute m-2 p-1 bg-black/80 text-white max-w-[300px] text-[10px] z-[9] pointer-events-none" style={{left: hoverInfo.x, top: hoverInfo.y}}>
//         <div>State: {hoverInfo.feature.properties.name}</div>
//         <div>Median Household Income: {hoverInfo.feature.properties.value}</div>
//         <div>Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}</div>
//       </div>
//     )}
//   </Map>
//   <ControlPanel year={year} onChange={value => setYear(value)} />
//   </>
//   );
// }

// Using Mapbox
"use client";
import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ControlPanel from "./control-panel";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import { MapLayerMouseEvent } from "mapbox-gl";
import { dataLayer } from "./map-style";
import { updatePercentiles } from "./utils";
import './index.css'

export default function Page() {
  const [year, setYear] = useState<number>(2015);
  const [allData, setAllData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ feature: GeoJSON.Feature; x: number; y: number } | null>(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson"
    )
      .then((resp) => resp.json())
      .then((json: GeoJSON.FeatureCollection) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features?.[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);

  const data: GeoJSON.FeatureCollection | null = useMemo(() => {
    return allData ? updatePercentiles(allData, (f) => f.properties?.income[year]) : null;
  }, [allData, year]);

  return (
    <div className="relative w-full h-screen">
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken="pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg"
        interactiveLayerIds={["data"]}
        onMouseMove={onHover}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>
        )}
        {hoverInfo && (
          <div
            className="absolute m-2 p-1 bg-black/80 text-white max-w-[300px] text-[10px] z-[9] pointer-events-none"
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>State: {hoverInfo.feature.properties?.name ?? "Unknown"}</div>
            <div>Median Household Income: {hoverInfo.feature.properties?.value ?? "N/A"}</div>
            <div>Percentile: {hoverInfo.feature.properties?.percentile ? (hoverInfo.feature.properties.percentile / 8) * 100 : "N/A"}</div>
          </div>
        )}
      </Map>
      <ControlPanel year={year} onChange={(value) => setYear(value)} />
    </div>
  );
}
