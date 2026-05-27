import './App.css';
import { useEffect, useState } from 'react';
import altitude from "./icons/altitude.png";
import speed from "./icons/speed.png";
import time from "./icons/time.png";

import pitch from "./icons/altitude.png";
import roll from "./icons/speed.png";
import yaw from "./icons/time.png";

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
                <h2>Controller</h2>
                <div className="movement-controls">
                    <div className="vertical-controls">
                        <button className="top-button controller-button">Ascend</button>
                        <button className="bottom-button controller-button">Descend</button>
                        <button className="right-button controller-button">Rotate right</button>
                        <button className="left-button controller-button">Rotate left</button>
                    </div>
                    <div className="divider-controller" />
                    <div className="direction-controls">
                        <button className="top-button controller-button">Forward</button>
                        <button className="right-button controller-button">Right</button>
                        <button className="bottom-button controller-button">Backwards</button>
                        <button className="left-button controller-button">Left</button>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <div className="GPS-section section">
                    <h3>GPS</h3>
                    <p> latitude:: </p>
                    <p> longitude:</p>
                    <p> altitude: </p>
                    <p> heading: </p>
                </div>

                <div className="route-summary section">
                    <h3>Route summary</h3>
                    <p> total distance: </p>
                    <p> est. flight time:</p>
                    <p> max altitude: </p>
                </div>

                <div className="battery-section section">
                    <h3>Battery</h3>
                    <p>battery percentage: {metrics?.battery?.batteryPercentage}</p>
                    <p>battery voltage: {metrics?.battery?.voltage}</p>
                    <p>est. remaining flight time: {metrics?.battery?.estimateRemainingFlightTime}</p>
                </div>
            </div>

            <div className="readings-section ">
                <h2>Readings</h2>

                <div className="flight-metric-section section">
                    <h3>Flight metrics</h3>
                    <div className="content-alignment">

                        <div className="metric-item">
                            <img src={altitude} alt="Altitude Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics.flight?.altitude : 'Loading...'} </p>
                            <p className="metric-title">Altitude</p>
                        </div>
                        <div className="divider" />

                        <div className="metric-item">
                            <img src={speed} alt="Speed Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics.flight?.speed : 'Loading...'}</p>
                            <p className="metric-title">Speed</p>
                        </div>
                        <div className="divider" />

                        <div className="metric-item">
                            <img src={time} alt="Altitude Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics.flight?.flightTime : 'Loading...'}</p>
                            <p className="metric-title">Flight time</p>
                        </div>
                    </div>
                </div>

                <div className="orientation-section section">
                    <h3>Orientation</h3>
                    <div className="content-alignment">
                        <div className="metric-item">
                            <img src={pitch} alt="Pitch Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics?.orientation?.pitch : 'Loading...'}</p>
                            <p className="metric-title">Pitch</p>
                        </div>
                        <div className="divider" />
                        <div className="metric-item">
                            <img src={roll} alt="Roll Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics?.orientation?.roll : 'Loading...'}</p>
                            <p className="metric-title">Roll</p>
                        </div>
                        <div className="divider" />
                        <div className="metric-item">
                            <img src={yaw} alt="Yaw Icon" className="icon" />
                            <p className="metric-value">{metrics ? metrics?.orientation?.yaw : 'Loading...'}</p>
                            <p className="metric-title">Yaw</p>
                        </div>
                    </div>
                </div>

                <div className="connection-status-section section">
                    <h3>Connection status</h3>
                    <div className="connection-content">
                        <div className="metric-item">
                            <p className="metric-title">Drone Connected: </p>
                            <p className="metric-value">{metrics ? metrics?.droneConnection ? "Yes" : "No" : 'Loading...'}</p>
                        </div>
                        <div className="divider" />
                        <div className="metric-item">
                            <p className="metric-title">API Connected: </p>
                            <p className="metric-value">{apiConnected ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>

                <div className="controller-pad section">
                    <h3>Quick actions</h3>
                    <div className="quick-action-alignment">
                        <button className="controller-button">Takeoff</button>
                        <button className="controller-button">Land</button>
                        <button className="controller-button">Hover</button>
                        <button className="controller-button">Emergency stop</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default App
