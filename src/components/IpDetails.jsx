/* eslint-disable react/prop-types */
import { useState } from "react";
import IconArrow from "./icons/IconArrow";
import "/images/icon-arrow.svg";
import Loader from "./Loader";

const IpDetails = ({ details, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onInputChange(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="relative bg-[url('/images/pattern-bg-mobile.png')] lg:bg-[url('/images/pattern-bg-desktop.png')] bg-no-repeat bg-center bg-cover h-[20rem] xl:h-[47svh] flex flex-col pt-6 gap-6">
      <h1 className="mx-auto text-[1.6rem] md:text-[2rem] font-medium text-white">
        IP Address Tracker
      </h1>
      <form onSubmit={onSubmit} className="w-[min(87%,34.5rem)] mx-auto flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 px-4 overflow-hidden placeholder:text-[12px] rounded-l-xl"
          placeholder="Search for any IP address or domain"
        />
        <button
          type="submit"
          className="p-5 px-[1.5rem] overflow-hidden bg-black rounded-r-xl"
          aria-label="submit"
        >
          <IconArrow />
        </button>
      </form>
      {details.length !== 0 ? (
        <ul className="z-20 shadow-xl p-6 absolute rounded-xl  w-[min(87%,60rem)] bg-white left-0 right-0 -bottom-[60%] lg:-bottom-[30%] mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left lg:py-9 xl:mx-auto xl:justify-center lg:gap-10 gap-5 lg:px-8 h-auto flex-initial">
          {details.map((detail) => (
            <li
              className="lg:first:pl-0 lg:pl-8 lg:space-y-2 lg:border-l-[1.5px] lg:first:border-l-0"
              key={detail.title}
            >
              <span className="tracking-widest block text-[12px] font-bold text-darkGrey-100">
                {detail.title}
              </span>
              <span className="block text-[1.2rem] lg:text-[1.6rem] font-medium">
                {detail.data}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default IpDetails;
