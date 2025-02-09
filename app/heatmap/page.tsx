"use client"
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl/mapbox';
import { heatmapLayer } from './map-style';
import { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import ControlPanel from './control-panel';
import './index.css'

const MAPBOX_TOKEN = "pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg";


function filterFeaturesByDay(
  featureCollection: FeatureCollection<Point, GeoJsonProperties>,
  time: number
): FeatureCollection<Point, GeoJsonProperties> {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const features = featureCollection.features.filter(feature => {
    const properties = feature.properties;
    if (!properties || !properties.time) {
      // Skip this feature if properties or time is missing
      return false;
    }

    const featureDate = new Date(properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return { type: 'FeatureCollection', features };
}

export default function App() {
  const [allDays, useAllDays] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 0]);
  const [selectedTime, selectTime] = useState<number>(0);
  const [earthquakes, setEarthQuakes] = useState<FeatureCollection<Point, GeoJsonProperties> | null>(null);

  useEffect(() => {
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
      .then(resp => resp.json())
      .then(json => {
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch(err => console.error('Could not load data', err));
  }, []);

  const data = useMemo(() => {
    return allDays ? earthquakes : filterFeaturesByDay(earthquakes!, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        selectedTime={selectedTime}
        allDays={allDays}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
}
