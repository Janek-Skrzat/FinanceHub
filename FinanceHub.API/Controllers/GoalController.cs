using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using Microsoft.AspNetCore.Authorization;
using FinanceHub.API.DTOs.Goals;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class GoalController : ControllerBase
{
    private readonly GoalService _goalService;

    public GoalController(GoalService goalService)
    {
        _goalService = goalService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var userId = GetUserId();
        return Ok(_goalService.GetAll(userId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var userId = GetUserId();
        var goal = _goalService.GetById(id, userId);
        if (goal == null) return NotFound();
        return Ok(goal);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateGoalRequest request)
    {
        var userId = GetUserId();
        var goal = _goalService.Create(
            userId,
            request.Name,
            request.TargetAmount,
            request.CurrentAmount,
            request.Deadline);
        return Created("", goal);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] CreateGoalRequest request)
    {
        var userId = GetUserId();
        var goal = _goalService.Update(
            id, userId,
            request.Name,
            request.TargetAmount,
            request.CurrentAmount,
            request.Deadline);
        return Ok(goal);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();
        var result = _goalService.Delete(id, userId);
        return result ? Ok() : NotFound();
    }
}