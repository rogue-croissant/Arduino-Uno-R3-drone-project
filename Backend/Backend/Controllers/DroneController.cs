using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DroneController : ControllerBase
    {

        [HttpGet]
        public IActionResult Get()
        {
            var droneConnection = "true";
            var orientation = new Orientation
            {
                pitch = 10,
                roll = 5,
                yaw = 270
            };

            var battery = new BatteryMetrics
            {
                batteryPercentage = 82,
                voltage = 12,
                estimateRemainingFlightTime = 0
            };

            var flight = new FlightMetrics
            {
                altitude = 120,
                speed = 45,
                flightTime = 18
            };
            return Ok(
                new
                { 
                    droneConnection,
                    orientation,
                    battery,
                    flight
                }
            );
        }
    }
}
