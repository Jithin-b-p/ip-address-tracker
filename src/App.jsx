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
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const { ip } = await response.json();
        setIP(ip);
      } catch (error) {
        console.log(error);
      }
    }
    getIP();
  }, []);

  useEffect(() => {
    async function getDetails() {
      if (!ip) return;

      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const { query, city, regionName, lat, lon, timezone, isp } =
          await response.json();

        const currentLocation = city + "," + regionName;
        setDetails([
          { title: "IP ADDRESS", data: query },
          { title: "LOCATION", data: currentLocation },
          { title: "TIMEZONE", data: timezone },
          { title: "ISP", data: isp },
        ]);

        setPosition([lat, lon]);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [ip]);

  const handleInputChange = (input) => {
    setIP(input);
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
