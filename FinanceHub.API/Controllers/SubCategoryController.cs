using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FinanceHub.API.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceHub.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class SubCategoryController : ControllerBase
{
    private readonly AppDbContext _db;

    public SubCategoryController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var subCategories = _db.SubCategories
            .Include(s => s.Category)
            .ToList();
        return Ok(subCategories);
    }

    [HttpGet("by-category/{categoryId}")]
    public IActionResult GetByCategory(int categoryId)
    {
        var subCategories = _db.SubCategories
            .Where(s => s.CategoryId == categoryId)
            .ToList();
        return Ok(subCategories);
    }
}