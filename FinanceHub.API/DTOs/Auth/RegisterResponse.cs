namespace FinanceHub.API.DTOs.Auth;

public class RegisterResponse
{
    public required string SuccessMessage { get; set; }
    public required string Token { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}