using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using FinanceHub.API.DTOs.Transfers;
using Microsoft.AspNetCore.Authorization;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class TransferController : ControllerBase
{
    private readonly TransferService _transferService;

    public TransferController(TransferService transferService)
    {
        _transferService = transferService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
    }
    [HttpGet]
    public IActionResult GetAll()
    {
        var userId = GetUserId();
        var transfer = _transferService.GetAll(userId);
        return Ok(transfer);
    }

    [HttpPost]
    public IActionResult Execute([FromBody] CreateTransferRequest request)
    {
        var userId = GetUserId();
        var account = _transferService.Execute(
            userId,
            request.FromAccountId,
            request.ToAccountId,
            request.Amount,
            request.Currency,
            request.Date,
            request.Description);
        return Created("", account);
    }
}