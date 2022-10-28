import { useState } from "react";
import "./index.css"
import Current from "./Current"
import Extra from "./Extra"
import timeConvert from "./Time";

function App() {
  const [weather,changeWeather]=useState({"value" : 0})
  const [searchText, changeSearchText]=useState('')
  const handleClick = (event) => {
    event.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&APPID=cd1840beedafe3ce968e746941f44e2c`, {mode: "cors"})
    .then(item => item.json())
    .then(item => changeWeather(item))
  }
  const handleChange = (event) => {
    changeSearchText(event.target.value)
  }
  return (
    <div className="app">
      <div className="main">
        <div>
          <form className="search" onSubmit={handleClick} >
            <input placeholder="Weather in your city" className=" search-bar form-control-plaintext" onChange={handleChange}></input>
            <button type="submit" className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>
        <Weather weather={weather} />
      </div>
    </div>
  );
}

function Weather(props) {
  if (props.weather.value===0) {
    
  }
  else if (props.weather.error) {
    return <p>{JSON.stringify(props.weather)}</p>
  }
  else {
    return (<div>
        <Current weather={props.weather} />
        <Extra items={["Wind","Humidity","Pressure"]} values={[props.weather.wind.speed+" km/h",props.weather.main.humidity+"%",props.weather.main.pressure+" millibars"]} />
        <Extra items={["Sunrise","Sunset"]} values={[timeConvert(props.weather.sys.sunrise,props.weather.timezone),timeConvert(props.weather.sys.sunset,props.weather.timezone)]} />
      </div>
  )
    
  }
}

export default App;
