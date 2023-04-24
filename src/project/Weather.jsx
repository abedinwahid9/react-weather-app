import "../style/style.css";
import { lazy, useState, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch";
// import react icons

import {
  WiDaySunny,
  WiDayRain,
  WiDayCloudy,
  WiDaySnow,
  WiDayThunderstorm,
} from "react-icons/wi";

import {
  BsCloudHaze2Fill,
  BsFillCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsSearch,
  BsCloudDrizzleFill,
  BsSnow2,
} from "react-icons/bs";

import { IoIosSunny } from "react-icons/io";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner2 } from "react-icons/im";
const Apikey = "860599d183ec7058e96fcb08ff047e4d";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { loading, error, data } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Apikey}&units=metric`
  );

  // if (error && !data) {
  //   setInputValue("");
  // }
  // console.log(data);

  // console.log(location);
  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const goApi = "53cac41e634f407e9d0cd410c67c2860";

      // Reverse geocode current location
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${goApi}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation(data?.results[0].components.city);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }, []);

  // input value
  const input = document.querySelector("input");

  const inputhandleValue = (e) => {
    setInputValue(e.target.value);
  };

  const inputhandlesubit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    if (input.value === "") {
      alert("enter city or country name");
    }

    e.preventDefault();
  };

  // weather set icon

  let icon;

  switch (data?.weather[0].main) {
    case "Clouds":
      icon = <WiDayCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <WiDayRain />;
      break;
    case "Clear":
      icon = <WiDaySunny />;
      break;
    case "Drizzle":
      icon = <BsFillCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <WiDaySnow />;
      break;
    case "Mist":
      icon = <BsSnow2 />;
      break;
    case "Thunderstorm":
      icon = <WiDayThunderstorm />;
      break;
    case "Sunny":
      icon = <IoIosSunny />;
  }

  // get date

  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className=" vh-100 container d-flex justify-content-center">
      <div className="d-flex flex-column align align-items-center  mt-5">
        {/* from  */}
        <form
          action=""
          className="form mb-2 d-flex px-4 py-2 justify-content-between align-items-center px-3 rounded-pill"
        >
          <input
            type="text"
            placeholder="search country"
            className=" bg-transparent px-1  text-white"
            onChange={(e) => {
              inputhandleValue(e);
            }}
          />
          <button
            onClick={(e) => inputhandlesubit(e)}
            type="button"
            className="btn btn-primary px-3 rounded-pill"
          >
            <BsSearch className="text-white mb-1 " />
          </button>
        </form>

        {/* card */}

        <div className="card text-white py-3 px-4 d-flex align-items-center">
          {loading ? (
            ""
          ) : !location ? (
            <div>
              <div>
                <ImSpinner2 className="spinner" />
              </div>
            </div>
          ) : error ? (
            <div>wrong country</div>
          ) : (
            <div className="cardB">
              <div className=" d-flex align-items-center justify-content-between iconsite">
                {/* icon */}
                <div className="icon text-white d-flex ">{icon}</div>
                <div className="d-flex flex-column justify-content-center">
                  {/* county name */}
                  <div className="h3">
                    {data?.name},{data?.sys.country}
                  </div>
                  {/* date */}
                  <div className="date">
                    {date.getDate()}-{months[date.getMonth()]}-
                    {date.getFullYear()}
                  </div>
                </div>
              </div>

              <div className="pb-5 pt-2 ">
                <div className="d-flex align-items-center justify-content-center">
                  {/* temp */}
                  <div className="temp">{parseInt(data?.main.temp)}</div>
                  <div className="h2">
                    <TbTemperatureCelsius />
                  </div>
                </div>
                <div>
                  <p className="h5 text-center">
                    {data?.weather[0].description}
                  </p>
                </div>
              </div>
              <div className="cardBody d-flex justify-content-between">
                <div className="d-flex body-details ">
                  <div className="me-2 d-flex  align-items-center">
                    <BsEye className="text-center" />
                  </div>
                  <div>
                    Visibility <span>{data?.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="d-flex  body-details justify-content-center">
                  <div className="me-2 d-flex  align-items-center">
                    <BsThermometer />
                  </div>
                  <div className="d-flex ">
                    Feels like{" "}
                    <div className="ms-2 d-flex">
                      {parseInt(data?.main.feels_like)}
                      <TbTemperatureCelsius className="mt-1 " />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardBody d-flex justify-content-between mt-2">
                <div className="d-flex body-details ">
                  <div className="me-2 d-flex  align-items-center">
                    <BsWater className="text-center" />
                  </div>
                  <div>
                    Humidity <span>{data?.main.humidity} %</span>
                  </div>
                </div>
                <div className="d-flex  body-details justify-content-center">
                  <div className="me-2 d-flex  align-items-center">
                    <BsWind />
                  </div>
                  <div className="d-flex ">
                    Wind{" "}
                    <span className="ms-2 d-flex">{data?.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
