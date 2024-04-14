/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import MapController from "./MapController";
import icon from "../icon";

const Map = ({ position, onPositionChange }) => {
  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onPositionChange(marker.getLatLng());
          setDraggable(true);
        }
      },
    }),
    [onPositionChange]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    position.length > 1 && (
      <MapContainer
        zoomControl={false}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={icon}
        >
          <MapController position={position} />
          <ZoomControl position="bottomleft" />
          <Popup minWidth={50}>
            <span onClick={toggleDraggable}>
              {draggable ? "Marker is draggable" : "location"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default Map;
