/* eslint-disable react/prop-types */
import { useState } from "react";
import IconArrow from "./icons/IconArrow";
import "/images/icon-arrow.svg";

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
    <section className="relative bg-[url('/images/pattern-bg-mobile.png')] lg:bg-[url('/images/pattern-bg-desktop.png')] bg-no-repeat bg-center bg-cover h-[58.5svh] flex flex-col pt-6 gap-6">
      <h1 className="mx-auto text-[1.6rem] font-medium text-white">
        IP Address Tracker
      </h1>
      <form onSubmit={onSubmit} className="w-[min(87%,60rem)] mx-auto flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 px-4 overflow-hidden rounded-l-xl"
        />
        <button
          type="submit"
          className="p-5 px-[1.5rem] overflow-hidden bg-black rounded-r-xl"
        >
          <IconArrow />
        </button>
      </form>
      <ul className="z-20 shadow-xl p-6 absolute left-[6.5%] rounded-xl -bottom-[55%] w-[min(87%,70rem)] bg-white mx-auto flex flex-col lg:flex-row items-center text-center gap-5">
        {details.map((detail) => (
          <li key={detail.title}>
            <span className="block text-[12px] font-bold text-darkGrey-100">
              {detail.title}
            </span>
            <span className="block text-[1.2rem] font-medium">
              {detail.data}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IpDetails;
