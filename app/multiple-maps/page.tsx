// "use client"

// import { LngLatLike, Map as MapboxMap } from 'mapbox-gl';
// import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from './src/index';

// import 'mapbox-gl/dist/mapbox-gl.css';
// import './style.css';
// import './multiple-maps.css';

// const app = document.querySelector<HTMLDivElement>('#app')!

// const mapContainer = document.createElement('div');
// mapContainer.id = 'map';
// app.appendChild(mapContainer);

// const map = new MapboxMap({
//     container: mapContainer,
//     zoom: 18,
//     center: [2.3592843, 48.8767904],
//     style: 'mapbox://styles/mapbox/streets-v10',
//     accessToken:'pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg',
//     hash: true
// }) as MapboxMapWithIndoor;

// const menuContainer = document.createElement('div');
// menuContainer.id = 'menu';
// app.appendChild(menuContainer);

// const buttonContainer = document.createElement('div');
// buttonContainer.id = 'corner-button';
// app.appendChild(buttonContainer);

// // Add a simple button to the left upper corner
// const cornerButton = document.createElement('button');
// cornerButton.innerHTML = 'Home'; // Button text
// cornerButton.addEventListener('click', () => {
//     window.location.href = '/'; // Action when the button is clicked
// });
// buttonContainer.appendChild(cornerButton);


// function createMenuButton(mapPath: string, center: LngLatLike) {
//     const btn = document.createElement('button');
//     const nam = mapPath.replace(/^.*[/]/, '');
//     btn.innerHTML = nam.replace('.geojson', '');
//     btn.addEventListener('click', () => { map.flyTo({ center, zoom: 18, duration: 2000 }); });
//     menuContainer.appendChild(btn);
// }

// /**
//  * Indoor specific
//  */

// addIndoorTo(map);

// // Create custom maps
// // Note: center is just used to switch between the three maps using map.flyTo() in the menu.
// const geojsonMaps: ({ path: string, center: LngLatLike, defaultLevel?: number }[]) = [
//     { path: 'maps/gare-de-l-est.geojson', center: [2.3592843, 48.8767904] },
//     { path: 'maps/caserne.geojson', center: [5.723078, 45.183754] },
//     { path: 'maps/grand-place.geojson', center: [5.732179, 45.157955], defaultLevel: 1 }
// ];

// geojsonMaps.forEach(({ path, center }) => createMenuButton(path, center));

// // Where the indoor layers will be inserted.
// // Here, 'housenum-label' comes from streets-v10
// const beforeLayerId = 'housenum-label';

// // To avoid unwanted overlap from streets-v10 layers, some layers are hidden when an indoor map is shown
// const layersToHide = ['poi-scalerank4-l15', 'poi-scalerank4-l1', 'poi-scalerank3', 'road-label-small'];

// geojsonMaps.forEach(async ({ path, defaultLevel }) => {

//     // Retrieve geojson from path
//     const geojson = await (await fetch(path)).json();

//     // Create indoor map from geojson and options
//     const indoorMap = IndoorMap.fromGeojson(geojson, { beforeLayerId, layersToHide, defaultLevel });

//     // Add map to the indoor handler
//     map.indoor.addMap(indoorMap);
// });

// // Add the specific control
// map.addControl(new IndoorControl());



"use client"

import React, { useEffect, useRef } from 'react';
import { LngLatLike, Map as MapboxMap } from 'mapbox-gl';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from './src/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import './multiple-maps.css';

interface MapLocation {
  path: string;
  center: LngLatLike;
  defaultLevel?: number;
}

const IndoorMapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapboxMapWithIndoor | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const geojsonMaps: MapLocation[] = [
    { path: './maps/gare-de-l-est.geojson', center: [2.3592843, 48.8767904] },
    { path: './maps/caserne.geojson', center: [5.723078, 45.183754] },
    { path: './maps/grand-place.geojson', center: [5.732179, 45.157955], defaultLevel: 1 }
  ];

  const createMenuButton = (mapPath: string, center: LngLatLike) => {
    if (!menuRef.current || !mapInstanceRef.current) return;

    const btn = document.createElement('button');
    const nam = mapPath.replace(/^.*[/]/, '');
    btn.innerHTML = nam.replace('.geojson', '');
    btn.addEventListener('click', () => {
      mapInstanceRef.current?.flyTo({ center, zoom: 18, duration: 2000 });
    });
    menuRef.current.appendChild(btn);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = new MapboxMap({
      container: mapContainerRef.current,
      zoom: 18,
      center: [2.3592843, 48.8767904],
      style: 'mapbox://styles/mapbox/streets-v10',
      accessToken: 'pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg',
      hash: true
    }) as MapboxMapWithIndoor;

    mapInstanceRef.current = map;

    // Add indoor functionality
    addIndoorTo(map);

    // Where the indoor layers will be inserted
    const beforeLayerId = 'housenum-label';
    const layersToHide = ['poi-scalerank4-l15', 'poi-scalerank4-l1', 'poi-scalerank3', 'road-label-small'];

    // Load and add indoor maps
    geojsonMaps.forEach(async ({ path, defaultLevel }) => {
      try {
        const response = await fetch(path);
        const geojson = await response.json();
        const indoorMap = IndoorMap.fromGeojson(geojson, { beforeLayerId, layersToHide, defaultLevel });
        map.indoor.addMap(indoorMap);
      } catch (error) {
        console.error(`Error loading indoor map from ${path}:`, error);
      }
    });

    // Add indoor control
    map.addControl(new IndoorControl());

    // Create menu buttons
    geojsonMaps.forEach(({ path, center }) => createMenuButton(path, center));

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <div ref={mapContainerRef} id="map" />
      <div ref={menuRef} id="menu" className="absolute right-0 top-0 h-auto w-[200px] bg-slate-700 shadow-md"/>
      <div id="corner-button">
        <button className="block m-4 h-auto w-11/12 bg-[#F7F5A0]/70" onClick={() => window.location.href = '/'}>Home</button>
      </div>
    </div>
  );
};

export default IndoorMapComponent;