export default function Extra(props) {
    return (
        <PressureWindHumidity weather={props.weather} />
    )
}

function PressureWindHumidity(props) {
    return (
        <div className="section">
            <div>
                <h2>Wind</h2>
                <h6>{props.weather.wind.speed} km/h</h6>
            </div>
            <div className="vl"></div>
            <div>
                <h2>Humidity</h2>
                <h6>{props.weather.main.humidity}%</h6>
            </div>
            <div className="vl"></div>
            <div>
                <h2>Pressure</h2>
                <h6>{props.weather.main.pressure} millibars</h6>
            </div>
        </div>
    )
}