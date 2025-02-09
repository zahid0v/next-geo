
"use client"
import React, {useEffect, useState} from 'react';

import {APIProvider, Map} from '@vis.gl/react-google-maps';

import ControlPanel from './components/control-panel';
import {CustomAdvancedMarker} from './components/custom-advanced-marker/custom-advanced-marker';
import {loadRealEstateListing} from './libs/load-real-estate-listing';
import {loadRealEstateListing2} from './libs/load-real-estate-listing';

import {RealEstateListing} from './types/types';
import './style.css';

const API_KEY = "AIzaSyB2JiMGfGgMkoh-m5W6yL5LW7ikTGIt8jE";

export default function App() {
  const [realEstateListing, setRealEstateListing] =
    useState<RealEstateListing | null>(null);
  const [realEstateListing2, setRealEstateListing2] =
  useState<RealEstateListing | null>(null);

  useEffect(() => {
    void loadRealEstateListing().then(data => {
      setRealEstateListing(data);
    });
      void loadRealEstateListing2().then(data2 => {
        setRealEstateListing2(data2);
      });
  }, []);

  return (
    <div className="advanced-marker-example">
      <APIProvider apiKey={API_KEY} libraries={['marker']}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultZoom={5}
          defaultCenter={{lat: 47.53, lng: -122.34}}
          style={{width: "100vw", height: "100vh"}}
          gestureHandling={'greedy'}
          disableDefaultUI>
          {/* advanced marker with html-content */}
          {realEstateListing && (
            <CustomAdvancedMarker realEstateListing={realEstateListing} />
          )}
          {realEstateListing2 && (
            <CustomAdvancedMarker realEstateListing={realEstateListing2} />
          )}
        </Map>

        <ControlPanel />
      </APIProvider>
    </div>
  );
};