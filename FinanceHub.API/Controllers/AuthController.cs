using Microsoft.AspNetCore.Mvc;
namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok("działa!");
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
