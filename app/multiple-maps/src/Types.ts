import type { FeatureCollection, Geometry } from 'geojson';

import type { 
    Map as MapboxMap
} from 'mapbox-gl';
import type { 
    Map as MaplibreMap, 
    Listener as MaplibreListener, 
    ExpressionSpecification as MaplibreExpressionSpecification
} from 'maplibre-gl';

import type IndoorLayer from './IndoorLayer';

export type Level = number;

export type LevelsRange = {
    min: Level,
    max: Level
};

export type IndoorMapOptions = {
    beforeLayerId?: string,
    defaultLevel?: number,
    layers?: Array<LayerSpecification>,
    layersToHide?: Array<string>,
    showFeaturesWithEmptyLevel?: boolean
}

export type IndoorMapGeoJSON = FeatureCollection<Geometry>;

// The two following types should come from mapboxgl-style-spec
// export type LayerSpecification = any;
export type LayerSpecification = {
    id: string;
    type: string;
    source?: string;
    'source-layer'?: string;
    paint?: Record<string, unknown>;
    layout?: Record<string, unknown>;
    filter?: unknown[];
    minzoom?: number;
    maxzoom?: number;
    // Add other properties as needed
};
export type ExpressionSpecification = MaplibreExpressionSpecification;

export type MapGL = MapboxMap | MaplibreMap;

export type MapboxMapWithIndoor = MapboxMap & {
    indoor: IndoorLayer,
};

export type IndoorMapEvent = 'indoor.map.loaded'
    | 'indoor.map.unloaded'
    | 'indoor.level.changed';

export type MaplibreMapWithIndoor = MaplibreMap & {
    indoor: IndoorLayer,
    on(type: IndoorMapEvent, listener: MaplibreListener): MaplibreMap;
    off(type: IndoorMapEvent, listener: MaplibreListener): MaplibreMap;
};

export type MapGLWithIndoor = MapboxMapWithIndoor | MaplibreMapWithIndoor;
