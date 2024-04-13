/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";
import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ position, onPositionChange }) => {
  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onPositionChange(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    position.length > 1 && (
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default Map;
