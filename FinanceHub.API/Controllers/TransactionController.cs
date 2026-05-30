using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using FinanceHub.API.DTOs.Transactions;
using Microsoft.AspNetCore.Authorization;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class TransactionController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
    }

    [HttpGet]
    public IActionResult GetAll(
        [FromQuery] DateTime? dateFrom,
        [FromQuery] DateTime? dateTo,
        [FromQuery] int? subCategoryId)
    {
        var userId = GetUserId();
        var transactions = _transactionService.GetAll(userId, dateFrom, dateTo, subCategoryId);
        return Ok(transactions);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var userId = GetUserId();
        var transaction = _transactionService.GetById(id, userId);
        if (transaction == null) return NotFound();
        return Ok(transaction);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTransactionRequest request)
    {
        try
        {
            var userId = GetUserId();
            var transaction = _transactionService.Create(
                userId,
                request.SubCategoryId,
                request.Amount,
                request.Currency,
                request.Type,
                request.Date,
                request.Description);
            return Created("", transaction);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateTransactionRequest request)
    {
        try
        {
            var userId = GetUserId();
            var transaction = _transactionService.Update(
                id,
                userId,
                request.Amount,
                request.Currency,
                request.Type,
                request.Date,
                request.Description);
            return Ok(transaction);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }



    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();
        var result = _transactionService.Delete(id, userId);
        return result ? Ok() : NotFound();
    }
}