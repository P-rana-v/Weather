import { useState } from "react";
import "./index.css"
import Current from "./Current"
import Extra from "./Extra"

function App() {
  const [weather,changeWeather]=useState({"value" : 0})
  const [searchText, changeSearchText]=useState('')
  const handleClick = () => {
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
        <div className="search">
          <input placeholder="Weather in your city" className=" search-bar form-control-plaintext" onChange={handleChange}></input>
          <button className="search-button" onClick={handleClick}><i className="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <Weather weather={weather} />
      </div>
    </div>
  );
}

function Weather(props) {
  if (props.weather.value===0) {
    return <p>Click to find weather</p>
  }
  else if (props.weather.error) {
    return <p>{JSON.stringify(props.weather)}</p>
  }
  else {
    return (<div>
        <Current weather={props.weather} />
        <Extra weather={props.weather} />
      </div>
  )
    
  }
}

export default App;
