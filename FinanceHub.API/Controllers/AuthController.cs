using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using FinanceHub.API.DTOs.Auth;
namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        var result = _authService.Register(request);
        return Ok(result);
    }
    [HttpPost("login")]
    public IActionResult Login()
    {
        return Ok("działa!");
    }
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok("działa!");
    }
    [HttpPost("refresh")]
    public IActionResult Refresh()
    {
        return Ok("działa!");
    }


}
