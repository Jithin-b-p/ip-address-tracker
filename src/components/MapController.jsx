/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    function flyTo() {
      map.flyTo(position, 15, {
        animate: true,
        duration: 1.5,
      });
    }

    flyTo();
  }, [position]);
  return null;
};

export default MapController;
