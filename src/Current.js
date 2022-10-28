export default function Current(props) {
    const main=props.current.main
    return (
        <div className="current-weather">
            <h1>{main.temp}°C</h1>
            <h6>{`Feels like ${main.feels_like}°C`}</h6>
            <h6>{props.current.weather[0].description}</h6>            
        </div>
    )
}