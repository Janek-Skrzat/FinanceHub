using Microsoft.AspNetCore.Mvc;
using FinanceHub.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }
    private int GetUserId()
    {
        return int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var userId = GetUserId();
        var categories = _categoryService.GetAll(userId);
        return Ok(categories);
    }
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var userId = GetUserId();
        var category = _categoryService.GetById(id, userId);
        return Ok(category);
    }
    [HttpPost]
    public IActionResult Create([FromBody] string name)
    {
        var userId = GetUserId();
        var category = _categoryService.Create(userId, name);
        return Created("", category);
    }
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] string name)
    {
        var userId = GetUserId();
        var category = _categoryService.Update(id, userId, name);
        return Ok(category);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();
        var category = _categoryService.Delete(id, userId);
        return category ? Ok() : NotFound();
    }
}