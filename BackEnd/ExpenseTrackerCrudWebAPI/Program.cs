using ExpenseTrackerAPI.Data;
using ExpenseTrackerCrudWebAPI.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);



// Read the JWT key from configuration and log it
var keyString = builder.Configuration["Jwt:Key"];
Console.WriteLine("JWT KEY from config: " + (keyString ?? "[NULL]"));

if (string.IsNullOrEmpty(keyString))
{
    throw new Exception("JWT Key is missing or empty in configuration");
}

var key = Encoding.UTF8.GetBytes(keyString);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

// Add services to the container.
builder.Services.AddControllers();

// Database contexts
builder.Services.AddDbContext<ExpenseDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("sqlconnectionstring")));
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("userdb")));

// CORS policy
builder.Services.AddCors(corsoptions =>
{
    corsoptions.AddPolicy("MyPolicy", policyoptions =>
    {
        policyoptions.AllowAnyHeader()
                     .AllowAnyOrigin()
                     .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

var app = builder.Build();

// Middleware pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();

app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
