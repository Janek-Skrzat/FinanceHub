using System.ComponentModel.DataAnnotations;
namespace FinanceHub.API.DTOs.Auth;

public class RegisterRequest
{
    [MaxLength(100)]
    public required string FirstName { get; set; }
    [MaxLength(100)]
    public required string LastName { get; set; }
    [MaxLength(255)]
    public required string Email { get; set; }
    [MaxLength(255)]
    public required string Password { get; set; }
}