using System.ComponentModel.DataAnnotations;
namespace FinanceHub.API.DTOs.Auth;

public class LoginRequest
{
    [MaxLength(255)]
    public required string Email { get; set; }
    [MaxLength(255)]
    public required string Password { get; set; }
}