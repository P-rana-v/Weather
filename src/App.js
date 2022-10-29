import { useEffect, useState } from "react";
import "./index.css"
import Current from "./Current"
import Extra from "./Extra"
import timeConvert from "./Time";
let extras=[]

function App() {
  let [color,setColor]=useState("linear-gradient(rgb(72,174,243) ,rgb(66, 147, 253))")
  const [weather,changeWeather]=useState({current: {"value" : 0}})
  let [err,changeErr]=useState({isError: false,error: {}})
  useEffect(() => {
    changeErr({isError: false,error: {}})
    if(weather.current.value===0){
    }
    else {
      let time=timeConvert(weather.current.dt,weather.current.timezone).hrs
      let sunset=timeConvert(weather.current.sys.sunset,weather.current.timezone).hrs
      let sunrise=timeConvert(weather.current.sys.sunrise,weather.current.timezone).hrs
      if(weather.current.weather[0].main==="Drizzle") {
        if (time<sunrise || time>sunset) setColor("linear-gradient(rgba(0, 110, 255, 0.5) -70%,black)")
        else setColor("linear-gradient(rgb(140, 140, 140) -50% ,rgb(66, 147, 253))")
      }
      else if (weather.current.weather[0].main==="Clear") {
        if (time===sunset) setColor("linear-gradient(rgb(203, 142, 0) ,rgba(255, 153, 0,0.5) )")
        else if(time>sunset || time<sunrise) setColor("linear-gradient(rgb(0, 0, 0) ,rgb(57, 57, 57) )")
        else setColor("linear-gradient(rgb(72,174,243) ,rgb(66, 147, 253))")
      }
      else if (weather.current.weather[0].main==="Thunderstorm") {
        setColor("linear-gradient(rgb(72, 72, 72) ,rgba(0, 162, 255, 0.8) 180% )")
      }
      else if (weather.current.weather[0].main==="Rain") {
        setColor("linear-gradient(rgb(101, 101, 101) ,rgba(0, 47, 255, 0.8) 150% )")
      }
      else if (weather.current.weather[0].main==="Clouds") {
        if (time===sunset) setColor("linear-gradient(rgb(121, 121, 121) ,rgba(255, 153, 0,0.5) )")
        else if(time>sunset || time<sunrise) setColor("linear-gradient(rgb(54, 54, 54) ,rgb(0, 0, 0) )")
        else setColor("linear-gradient(rgb(101, 101, 101) 0%,rgba(0, 153, 255, 0.7) 130% )")
      }
      else if (weather.current.weather[0].main==="Snow") {
        setColor("linear-gradient(rgb(190, 190, 190) 30%,rgba(0, 153, 255, 0.4) )")
      }
      else if (weather.current.weather[0].main==="Atmosphere") {
        setColor("linear-gradient(rgb(121, 121, 121) ,rgb(163, 163, 163) )")
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
    .then(item=> {
      if(item.cod!==200){
        throw item
      }
      else return item})
    .then(item=>temp=item)
    .then(()=>{
      fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchText}&units=metric&appid=cd1840beedafe3ce968e746941f44e2c`, {mode: "cors"})
      .then(item => item.json())
      .then(item => temp2=item)
      .then(()=> {update(temp,temp2)})
      .then(() => changeWeather(()=>{return {current: temp,forecast: temp2}}))
    }).catch(item=>{changeErr({isError: true,error: item})})
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
        <Weather err={err} current={weather.current} />
      </div>
    </div>
  );
}

function Weather(props) {
  if (props.current.value===0) {
    
  }
  else if (props.err.isError) {
    return <Error error={props.err.error}/>
  }
  else {
    return (<div>
        <Current current={props.current} />
        {extras}
      </div>
    )
  }
}

const Error = (props) => {
  console.log(true)
  return (
    <h1 className="error">Error Code : {props.error.cod}<br /> {props.error.message}</h1>
  )
}

export default App;
