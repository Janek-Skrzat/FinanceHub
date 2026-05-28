namespace FinanceHub.API.DTOs.Auth;

public class LoginResponse
{
    public required string SuccessMessage { get; set; }
    public required string Token { get; set; }
}