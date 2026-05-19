
using Microsoft.AspNetCore.SignalR;

namespace Backend
{
    public class DroneBackgroundService: BackgroundService
    {
        private readonly IHubContext<DroneHub> _hub;

        public DroneBackgroundService(IHubContext<DroneHub> hub)
        {
            _hub = hub;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var random = new Random();

            
            while (!stoppingToken.IsCancellationRequested)
            {
                var data = new
                {
                    droneConnection = true,
                    orientation = new { pitch = 15, roll = 50, yaw = 270 },
                    battery = new { batteryPercentage = 82, voltage = 11.1, estimateRemainingFlightTime = 15 },
                    flight = new { altitude = random.Next(100, 150), speed = random.Next(30, 60), flightTime = 18 }
                };

                await _hub.Clients.All.SendAsync("DroneUpdate", data);

                await Task.Delay(1000);
            }
        }
    }
}
