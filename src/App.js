import { useEffect, useState } from "react";
import "./index.css"
import Current from "./Current"
import Extra from "./Extra"
import timeConvert from "./Time";
let extras=[]

function App() {
  let [color,setColor]=useState("linear-gradient(rgb(72,174,243) ,rgb(66, 147, 253))")
  const [weather,changeWeather]=useState({current: {"value" : 0}})
  useEffect(() => {
    if(weather.current.value===0){
    }
    else{
      if(weather.current.weather[0].main==="Clouds") {
        setColor("linear-gradient(rgb(140, 140, 140) ,rgb(66, 147, 253))")
      }
      else if (weather.current.weather[0].main==="Clear") {
        setColor("linear-gradient(rgb(72,174,243) ,rgb(66, 147, 253))")
      }
    }
  },[weather])
  const [searchText, changeSearchText]=useState('')
  const update = (current,forecast)=> {
    let forecastDates=forecast.list.map(item => {
      return timeConvert(item.dt,forecast.city.timezone)
    })
    let sunrise=timeConvert(current.sys.sunrise,current.timezone)
    let sunset=timeConvert(current.sys.sunset,current.timezone)
    let fiveDay = forecastDates.map((item,index)=> {
      return [item.day+"  "+item.hrs+" : "+item.mins,forecast.list[index].weather[0].description]
    })
    let fiveDayObject={}
    fiveDay.forEach((item)=>{
      fiveDayObject[item[0]]=item[1]
    })
    let data=[
      {
        Wind: current.wind.speed+" km/h",
        Humidity: current.main.humidity+"%",
        Pressure:current.main.pressure+" millibars"
      },
      {
        Sunrise: sunrise.hrs+" : "+sunrise.mins,
        Sunset: sunset.hrs+" : "+sunset.mins
      }
    ]
    data.push(fiveDayObject)
    extras=data.map((item,index)=> {
      let items=[]
      let values=[]
      Object.keys(item).forEach(key => {
        items.push(key)
        values.push(item[key])
      })
      return <Extra id={index} key={index} items={items} values={values} />
    })
  }
  const handleClick = (event) => {
    let temp,temp2
    event.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&APPID=cd1840beedafe3ce968e746941f44e2c`, {mode: "cors"})
    .then(item => item.json())
    .then(item=>temp=item)
    .then(()=>{
      fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=cd1840beedafe3ce968e746941f44e2c`, {mode: "cors"})
      .then(item => item.json())
      .then(item => temp2=item)
      .then(()=> {update(temp,temp2)})
      .then(() => changeWeather(()=>{return {current: temp,forecast: temp2}}))
    })
  }
  const handleChange = (event) => {
    changeSearchText(event.target.value)
  }
  return (
    <div style={{background: color}} className="app">
      <div className="main">
        <div>
          <form className="search" onSubmit={handleClick} >
            <input placeholder="Weather in your city" className=" search-bar form-control-plaintext" onChange={handleChange}></input>
            <button type="submit" className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>
        <Weather current={weather.current} />
      </div>
    </div>
  );
}

function Weather(props) {
  if (props.current.value===0) {
    
  }
  else if (props.current.error) {
    return <p>{JSON.stringify(props.current)}</p>
  }
  else {
    return (<div>
        <Current current={props.current} />
        {extras}
      </div>
  )
    
  }
}

export default App;
