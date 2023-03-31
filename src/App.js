import { useState } from 'react';
import logo from "./components/image/logo.png"
import './App.css';
import { useRef } from 'react';
 




const ListIcon = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ]
  
  const WeatherApp = () => {
    const inputRef = useRef(null);
    const [apiData, setApiData] = useState(null);
    const [showWeather, setShowWeather] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchWeather = async () => {
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=991a149db366bd9613c8c1bc89f7d2c5`)
        .then((res) => res.json())
        .then((data) => {
          setApiData(null);
          if (data.cod == 404 || data.cod == 400) {
            setShowWeather([
              {
                type: "Not Found",
                img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
              },
            ]);
          }
          setShowWeather(
            ListIcon.filter((weather) => weather.type === data.weather[0].main)
          );
          console.log(data);
          setApiData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
  
    return (
      <div className="App">
        <div className="main">
          <div className="search">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter Your Location"
              className="input"
            />
            <div onClick={fetchWeather}>
              <img
                src={logo}
                alt="Search Icon"
                className="icon"
              />
            </div>
          </div>
          <div className={`weather-details ${showWeather ? "show" : ""}`}>
            {loading ? (
              <div className="load">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                  alt="Loading Icon"
                  className="load-icon"
                />
              </div>
            ) : (
              showWeather && (
                <div className="info">
                  {apiData && (
                    <p className="name">
                      {apiData?.name + ", " + apiData?.sys?.country}
                    </p>
                  )}
                  <img
                    src={showWeather[0]?.img}
                    alt={showWeather[0]?.description}
                    className="image"
                  />
  
                  <p className="type">{showWeather[0]?.type}</p>
                  {apiData && (
                    <>
                      <div className="temp">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1843/1843544.png"
                          alt="Icon"
                          className="temp-icon"
                        />
                        <p className="temp-value">
                          {apiData?.main?.temp}&#176;C
                        </p>
                      
  
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherApp;


