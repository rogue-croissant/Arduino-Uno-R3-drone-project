using Backend;

var builder = WebApplication.CreateBuilder(args); //Creates the ASP.NET application builder.

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHostedService<DroneBackgroundService>();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                    .AllowCredentials();
        });
});

var app = builder.Build();
app.UseCors("AllowReactApp");
app.UseRouting();

app.MapHub<DroneHub>("/droneHub");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
