import { useState } from "react";
import { useEffect } from "react";
import IpDetails from "./components/IpDetails";
import Map from "./components/Map";

const App = () => {
  const [ip, setIP] = useState("");
  const [details, setDetails] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    async function getIP() {
      const ipApi = import.meta.env.VITE_IP_URL;
      try {
        const response = await fetch(`${ipApi}`);
        const { ip } = await response.json();
        setIP(ip);
        console.log(ip);
      } catch (error) {
        console.log(error);
      }
    }
    getIP();
  }, []);

  useEffect(() => {
    async function getDetails() {
      if (!ip) return;
      const detailsApi = import.meta.env.VITE_DETAILS_URL;
      try {
        const response = await fetch(`${detailsApi}${ip}`);
        const { location, isp } = await response.json();
        console.log(location, isp);
        const currentLocation = location.region + "," + location.country;
        setDetails([
          { title: "IP ADDRESS", data: ip },
          { title: "LOCATION", data: currentLocation },
          { title: "TIMEZONE", data: location.timezone },
          { title: "ISP", data: isp },
        ]);

        setPosition([location.lat, location.lng]);

        console.log(position, details);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [ip]);

  return (
    <main className="bg-gray-300">
      <IpDetails details={details} />
      <Map position={position} onPositionChange={setPosition} />
    </main>
  );
};

export default App;
