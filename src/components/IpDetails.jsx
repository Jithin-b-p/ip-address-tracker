/* eslint-disable react/prop-types */
import IconArrow from "./icons/IconArrow";
import "/images/icon-arrow.svg";

const details = [
  { title: "IP ADDRESS", data: "192.212.174.101" },
  { title: "LOCATION", data: "Brooklyn, NY 10001" },
  { title: "TIMEZONE", data: "UTC-05:00" },
  { title: "ISP", data: "SpaceX Starlink" },
];
const IpDetails = () => {
  return (
    <section className="relative bg-[url('/images/pattern-bg-mobile.png')] bg-no-repeat bg-center bg-cover h-[58.5svh] flex flex-col pt-6 gap-6">
      <h1 className="mx-auto text-[1.6rem] font-medium text-white">
        IP Address Tracker
      </h1>
      <form className="w-[min(87%,60rem)] mx-auto flex">
        <input
          type="text"
          className="flex-1 px-4 overflow-hidden rounded-l-xl"
        />
        <button
          type="submit"
          className="p-5 px-[1.5rem] overflow-hidden bg-black rounded-r-xl"
        >
          <IconArrow />
        </button>
      </form>
      <ul className="z-20 shadow-xl p-6 absolute left-[6.5%] rounded-xl -bottom-[55%] w-[min(87%,60rem)] bg-white mx-auto flex flex-col items-center text-center gap-5">
        {details.map((detail) => (
          <li key={detail.title}>
            <span className="block text-[12px] font-bold text-darkGrey-100">
              {detail.title}
            </span>
            <span className="block text-[1.2rem] font-bold">{detail.data}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IpDetails;
