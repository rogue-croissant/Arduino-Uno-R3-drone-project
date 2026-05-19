import './App.css';
import { useEffect, useState } from 'react';

import * as signalR from '@microsoft/signalr';

function App() {
    const [metrics, setMetrics] = useState(null);
    const [apiConnected, setApiConnected] = useState(false);
    useEffect(() => {

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7069/droneHub", {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("Connected to SignalR");
                setApiConnected(true);
            })
            .catch(err => {
                console.error("Connection failed:", err);
                setApiConnected(false);
            });

        connection.on("DroneUpdate", (data) => {
            console.log("Live drone data:", data);
            setMetrics(data);
        });

        return () => {
            connection.stop();
        };

    }, []);


    return (
        <div>
            <h1>Drone readings (Live)</h1>

            <p>API Connected: {apiConnected ? "Yes" : "No"}</p>

            <p>Altitude: {metrics?.flight?.altitude}</p>
            <p>Speed: {metrics?.flight?.speed}</p>
            <p>Battery: {metrics?.battery?.batteryPercentage}</p>



            <div>
                <div className="readings">
                    <h1>Drone readings</h1>

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
                    <div className="connection_status">
                        <h2>Connection status</h2>
                        <p>Drone Connected: {metrics?.droneConnection}</p>
                        <p>API Connected: {apiConnected ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
