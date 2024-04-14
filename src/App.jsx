import { useState } from "react";
import { useEffect } from "react";
import IpDetails from "./components/IpDetails";
import Map from "./components/Map";

const App = () => {
  const [ipAddress, setIPAddress] = useState("");
  const [details, setDetails] = useState([]);
  const [position, setPosition] = useState([]);

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const localIP = import.meta.env.VITE_IP_URL;
    async function getIP() {
      try {
        const response = await fetch(`${localIP}`);
        const { ip } = await response.json();
        setIPAddress(ip);
      } catch (error) {
        console.log(error);
      }
    }
    getIP();
  }, []);

  useEffect(() => {
    async function getDetails() {
      if (!ipAddress) return;

      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${
            checkIpAddress.test(ipAddress)
              ? `ipAddress=${ipAddress}`
              : checkDomain.test(ipAddress)
              ? `domain=${ipAddress}`
              : ""
          }`
        );

        const { ip, location, isp } = await response.json();

        const currentLocation = location.city + "," + location.region;
        setDetails([
          { title: "IP ADDRESS", data: ip },
          { title: "LOCATION", data: currentLocation },
          { title: "TIMEZONE", data: location.timezone },
          { title: "ISP", data: isp },
        ]);

        setPosition([location.lat, location.lng]);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [ipAddress]);

  const handleInputChange = (input) => {
    setIPAddress(input);
  };

  const handlePositionChange = (value) => {
    setPosition(value);
  };

  return (
    <main className="bg-gray-300">
      <IpDetails details={details} onInputChange={handleInputChange} />
      <Map position={position} onPositionChange={handlePositionChange} />
    </main>
  );
};

export default App;
