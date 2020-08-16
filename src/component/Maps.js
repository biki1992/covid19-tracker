import React from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from '../utils';
import "../css/Maps.css";
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function Maps({ countries, caseType, center, zoom }) {
    
    return (
        <div className="maps">
                <LeafletMap className="map__container" center={center} zoom={zoom}>
                    <TileLayer
                        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Jao5Xh90YCSZuya3JMta"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* { showDataOnMap(countries, caseType)} */}
                </LeafletMap>
        </div>
    )
}

export default Maps;
