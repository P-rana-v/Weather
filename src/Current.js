export default function Current(props) {
    const main=props.weather.main
    return (
        <div class="current-weather">
            <h1>{main.temp}°C</h1>
            <h6>{`Feels like ${main.feels_like}°C`}</h6>
            <h6>{props.weather.weather[0].description}</h6>            
        </div>
    )
}