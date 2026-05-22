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
        <div className="home-page">
            <div className="controller-section">
                <h1>Controller section</h1>

                <div className="movement-controls">
                    <div className="verticle-controls">
                        <button className="controller-button">Ascend</button>
                        <button className="controller-button">Descend</button>
                        <button className="controller-button">Rotate right</button>
                        <button className="controller-button">Rotate left</button>
                    </div>
                    <div className="divider" />
                    <div className="direction-controls">
                        <button className="controller-button">Forward</button>
                        <button className="controller-button">Right</button>
                        <button className="controller-button">Backwards</button>
                        <button className="controller-button">Left</button>
                    </div>
                </div>

                <div className="controller-pad-section">
                    <button className="controller-action-buttons">Takeoff</button>
                    <button className="controller-action-buttons">Land</button>
                    <button className="controller-action-buttons">Hover</button>
                </div>
            </div>
            <div className="readings-section">
                <div className="flight-metric-section">
                    <h1>Flight metrics</h1>
                    <p>Altitude: {metrics ? metrics.flight?.altitude : 'Loading...'}</p>
                    <p>Speed: {metrics ? metrics.flight?.speed : 'Loading...'}</p>
                    <p>Flight Time: {metrics ? metrics.flight?.flightTime : 'Loading...'}</p>
                </div>
                <div className="orientation-section">
                    <h1>Orientation</h1>
                    <p>pitch: {metrics ? metrics?.orientation?.pitch : 'Loading...'}</p>
                    <p>roll: {metrics ? metrics?.orientation?.roll : 'Loading...'}</p>
                    <p>yaw: {metrics ? metrics?.orientation?.yaw : 'Loading...'}</p>

                </div>

            </div>
            <div className="bottom-section">
                <div className="GPS-section">
                    <h1>GPS</h1>
                    <p> latitude:: </p>
                    <p> longitude:</p>
                    <p> altitude: </p>
                    <p> heading: </p>
                </div>
                <div className="GPS-summary">
                    <h1>route summary</h1>
                    <p> total distance: </p>
                    <p> est. flight time:</p>
                    <p> max altitude: </p>
                </div>
                <div className="connection-status-section">
                    <h1>Connection status</h1>
                    <p>Drone Connected: {metrics?.droneConnection}</p>
                    <p>API Connected: {apiConnected ? "Yes" : "No"}</p>
                </div>
                <div className="battery-section">
                    <h1>Battery</h1>
                    <p>battery percentage: {metrics?.battery?.batteryPercentage}</p>
                    <p>battery voltage: {metrics?.battery?.voltage}</p>
                    <p>estimate remaining flight time: {metrics?.battery?.estimateRemainingFlightTime}</p>
                </div>
            </div>
        </div >
    )
}

export default App
