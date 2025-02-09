"use client"
import * as React from 'react';
import {useRef} from 'react';
import {Map, Source, Layer} from 'react-map-gl/mapbox';
import { MapLayerMouseEvent } from 'mapbox-gl';
import ControlPanel from './control-panel';
import { Point} from 'geojson';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

import type {MapRef} from 'react-map-gl/mapbox';
import type {GeoJSONSource} from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2U0NDU0IiwiYSI6ImNtNGJtbTJuZzAxZW8ya3BmdjhpbWszNXIifQ.1vr_N_sw1FCOMKnbvVXxZg'; // Set your mapbox token here

export default function App() {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: MapLayerMouseEvent) => {
      if (!event.features || event.features.length === 0) return;
    
    const feature = event.features[0];
    const clusterId = feature.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }
      const targetZoom = zoom ?? mapRef.current?.getZoom();
      const coordinates = (feature.geometry as Point).coordinates as [number, number];

      mapRef.current?.easeTo({
        center: coordinates,
        zoom: targetZoom,
        duration: 500
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3
        }}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id ?? "default-layer-id"]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
      <ControlPanel />
    </>
  );
}