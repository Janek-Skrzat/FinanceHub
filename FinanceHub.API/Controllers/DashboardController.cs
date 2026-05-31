using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FinanceHub.API.Data;
using FinanceHub.API.Services;
using System.Security.Claims;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly CurrencyService _currencyService;

    public DashboardController(AppDbContext db, CurrencyService currencyService)
    {
        _db = db;
        _currencyService = currencyService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    }

    [HttpGet("networth")]
    public async Task<IActionResult> GetNetWorth()
    {
        var userId = GetUserId();
        var accounts = _db.Accounts.Where(a => a.UserId == userId).ToList();

        decimal totalNetWorth = 0;

        foreach (var account in accounts)
        {
            var rate = await _currencyService.GetRate(account.Currency);
            totalNetWorth += account.Balance / rate;
        }

        return Ok(new
        {
            netWorth = Math.Round(totalNetWorth, 2),
            currency = "PLN",
            accountCount = accounts.Count
        });
    }
}