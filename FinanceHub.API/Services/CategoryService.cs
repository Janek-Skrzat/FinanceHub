using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class CategoryService
    {
        private readonly AppDbContext _db;
        
        public CategoryService(AppDbContext db)
        {
            _db = db;
        }
        
        public List<Category> GetAll(int userId)
        {
            return _db.Categories
                .Where(c => c.UserId == null || c.UserId == userId)
                .ToList();
        }
        
        public Category? GetById(int id, int userId)
        {
            return _db.Categories
                .FirstOrDefault(c => c.Id == id && (c.UserId == null || c.UserId == userId));
        }
        
        public Category Create(int userId, string name)
        {
            Category category = new Category { UserId = userId, Name = name };
            _db.Add(category);
            _db.SaveChanges();
            return category;
        }
        
        public Category? Update(int id, int userId, string name)
        {
            Category? category = GetById(id, userId);
            if (category == null)
            {
                return null;
            }
            category.Name = name;
            _db.SaveChanges();
            return category;
        }
        
        public bool Delete(int id, int userId)
        {
            Category? category = GetById(id, userId);
            if (category == null)
            {
                return false;
            }
            _db.Remove(category);
            _db.SaveChanges();
            return true;
        }
    }
}