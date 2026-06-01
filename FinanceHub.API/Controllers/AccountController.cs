using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using FinanceHub.API.DTOs.Accounts;
using Microsoft.AspNetCore.Authorization;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountController(AccountService accountService)
    {
        _accountService = accountService;
    }

    private int GetUserId()
    {
        var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (claim == null) throw new UnauthorizedAccessException();
        return int.Parse(claim);
    }
    [HttpGet]
    public IActionResult GetAll()
    {
        var userId = GetUserId();
        var account = _accountService.GetAll(userId);
        return Ok(account);
    }
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var userId = GetUserId();
        var account = _accountService.GetById(id, userId);
        if (account == null) return NotFound();
        return Ok(account);
    }
    [HttpPost]
    public IActionResult Create([FromBody] CreateAccountRequest request)
    {
        var userId = GetUserId();
        var account = _accountService.Create(
            userId,
            request.Name,
            request.Type,
            request.Balance,
            request.Currency,
            request.InterestRate,
            request.MaturityDate);
        return Created("", account);
    }
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] CreateAccountRequest request)
    {
        var userId = GetUserId();
        var account = _accountService.Update(
            id,
            userId,
            request.Name,
            request.Type,
            request.Balance,
            request.Currency,
            request.InterestRate,
            request.MaturityDate);
        if (account == null) return NotFound();
        return Ok(account);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();
        var account = _accountService.Delete(id, userId);
        return account ? Ok() : NotFound();
    }
}