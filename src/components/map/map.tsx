import 'leaflet/dist/leaflet.css';
import { OfferCity, PointInfo } from '../../types/offer';
import { useRef, useEffect } from 'react';
import {layerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import { defaultCustomIcon, currentCustomIcon } from '../../const';

type MapProps = {
  city: OfferCity;
  points: PointInfo[];
  selectedPoint: string | null;
};

function Map({city, points, selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== null && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div id="map" style={{width: '100%', height: '100%'}} ref={mapRef}>

    </div>
  );
}

export default Map;
