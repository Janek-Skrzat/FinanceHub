using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using FinanceHub.API.DTOs.Liabilities;
using Microsoft.AspNetCore.Authorization;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class LiabilityController : ControllerBase
{
    private readonly LiabilityService _liabilityService;

    public LiabilityController(LiabilityService liabilityService)
    {
        _liabilityService = liabilityService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var userId = GetUserId();
        return Ok(_liabilityService.GetAll(userId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var userId = GetUserId();
        var liability = _liabilityService.GetById(id, userId);
        if (liability == null) return NotFound();
        return Ok(liability);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateLiabilityRequest request)
    {
        var userId = GetUserId();
        var liability = _liabilityService.Create(
            userId,
            request.Name,
            request.TotalAmount,
            request.RemainingAmount,
            request.MonthlyPayment,
            request.Deadline);
        return Created("", liability);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] CreateLiabilityRequest request)
    {
        var userId = GetUserId();
        var liability = _liabilityService.Update(
            id, userId,
            request.Name,
            request.TotalAmount,
            request.RemainingAmount,
            request.MonthlyPayment,
            request.Deadline);
        return Ok(liability);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();
        var result = _liabilityService.Delete(id, userId);
        return result ? Ok() : NotFound();
    }
}