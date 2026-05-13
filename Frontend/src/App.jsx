import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [metrics, setMetrics] = useState(null);
    useEffect(() => {
        fetch("https://localhost:7069/api/Drone").then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMetrics(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <div>
            <div className="flight_metrics">
                <h2>Flight metrics</h2>
                <p>altitude: {metrics?.flight?.altitude}</p>
                <p>speed: {metrics?.flight?.speed}</p>
                <p>flight time: {metrics?.flight?.flightTime}</p>
            </div>

            <div className="orientation">
                <h2>Orientation</h2>
                <p>pitch: {metrics?.orientation?.pitch}</p>
                <p>roll: {metrics?.orientation?.roll}</p>
                <p>yaw: {metrics?.orientation?.yaw}</p>
            </div>

            <div className="battery_metrics">
                <h2>Battery metrics</h2>
                <p>battery percentage: {metrics?.battery?.batteryPercentage}</p>
                <p>battery voltage: {metrics?.battery?.voltage}</p>
                <p>estimate remaining flight time: {metrics?.battery?.estimateRemainingFlightTime}</p>
            </div>
        </div>
    )
}

export default App
