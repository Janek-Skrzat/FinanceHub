using FinanceHub.API.Data;
using Microsoft.EntityFrameworkCore;
using FinanceHub.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddScoped<AuthService>();
var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
