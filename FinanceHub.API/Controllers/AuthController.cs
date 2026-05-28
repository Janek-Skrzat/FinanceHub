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
        try
        {
            var result = _authService.Register(request);
            return Created("", result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = _authService.Login(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
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
