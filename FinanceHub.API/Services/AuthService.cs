using FinanceHub.API.Data;
using FinanceHub.API.DTOs.Auth;
using FinanceHub.API.Models;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace FinanceHub.API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }
        public RegisterResponse Register(RegisterRequest request)
        {
            var normalizedEmail = request.Email.ToLowerInvariant();
            var existingUser = _db.Users.FirstOrDefault(u => u.Email == normalizedEmail);
            if (existingUser != null)
            {
                throw new Exception("Email już istnieje");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = normalizedEmail,
                PasswordHash = passwordHash
            };

            _db.Users.Add(user);
            _db.SaveChanges();
            var token = GenerateJwtToken(user);

            return new RegisterResponse
            {
                SuccessMessage = "Konto utworzone pomyślnie!",
                Token = token,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        public LoginResponse Login(LoginRequest request)
        {
            var existingUser = _db.Users.FirstOrDefault(u => u.Email == request.Email.ToLowerInvariant());
            if (existingUser == null)
            {
                throw new Exception("Nieprawidłowy email lub hasło");
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, existingUser.PasswordHash);
            if (!isPasswordValid)
            {
                throw new Exception("Nieprawidłowy email lub hasło");
            }
            var token = GenerateJwtToken(existingUser);
            return new LoginResponse
            {
                SuccessMessage = "Zalogowano pomyślnie!",
                Token = token
            };
        }

        private string GenerateJwtToken(User user)
        {
            var secret = _config["JwtSettings:Secret"]
                ?? throw new InvalidOperationException("JwtSettings:Secret nie jest skonfigurowany");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email)
    };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

