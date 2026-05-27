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
               <h2>Controller</h2>
            <div className="movement-controls">
                    <div className="vertical-controls">
                        <button className="top-button controller-button">Ascend</button>
                        <button className= "bottom-button controller-button">Descend</button>
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
                    <p>Altitude: {metrics ? metrics.flight?.altitude : 'Loading...'}</p>
                    <div className="divider" />
                    <p>Speed: {metrics ? metrics.flight?.speed : 'Loading...'}</p>
                    <div className="divider" />
                    <p>Flight Time: {metrics ? metrics.flight?.flightTime : 'Loading...'}</p>
                </div>
                </div>
                
                <div className="orientation-section section">
                    <h3>Orientation</h3>
                    <div className="content-alignment">
                    <p>Pitch: {metrics ? metrics?.orientation?.pitch : 'Loading...'}</p>
                    <div className="divider" />
                    <p>Roll: {metrics ? metrics?.orientation?.roll : 'Loading...'}</p>
                    <div className="divider" />
                    <p>Yaw: {metrics ? metrics?.orientation?.yaw : 'Loading...'}</p>
                    </div>
                </div>

                <div className="connection-status-section section">
                    <h3>Connection status</h3>
                    <div className="content-alignment">
                    <p>Drone Connected: {metrics?.droneConnection}</p>
                    <div className="divider" />
                    <p>API Connected: {apiConnected ? "Yes" : "No"}</p>
                </div>
                </div>

                <div className="controller-pad section">
                    <h3>Quick actions</h3>
                    <div className="content-alignment">
                    <button className="controller-button">Takeoff</button>
                    <button className="controller-button">Land</button>
                    <button className="controller-button">Hover</button>
                    </div>
                </div>
        </div>
           
    </div >
    )
}

export default App
