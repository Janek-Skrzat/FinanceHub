using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class GoalService
    {
        private readonly AppDbContext _db;

        public GoalService(AppDbContext db)
        {
            _db = db;
        }
        public List<Goal> GetAll(int userId)
        {
            return _db.Goals
                .Where(a => a.UserId == userId)
                .ToList();
        }
        public Goal? GetById(int id, int userId)
        {
            return _db.Goals
                .FirstOrDefault(a => a.Id == id && a.UserId == userId);
        }
        public Goal Create(int userId, string name, decimal targetAmount, decimal currentAmount, DateTime? deadline)
        {
            var goal = new Goal
            {
                UserId = userId,
                Name = name,
                TargetAmount = targetAmount,
                CurrentAmount = currentAmount,
                Deadline = deadline
            };
            _db.Add(goal);
            _db.SaveChanges();
            return goal;
        }
        public Goal? Update(int id, int userId, string name, decimal targetAmount, decimal currentAmount, DateTime? deadline)
        {
            Goal? goal = GetById(id, userId);
            if (goal == null) return null;

            goal.Name = name;
            goal.TargetAmount = targetAmount;
            goal.CurrentAmount = currentAmount;
            goal.Deadline = deadline;

            _db.SaveChanges();
            return goal;
        }
        public bool Delete(int id, int userId)
        {
            Goal? goal = GetById(id, userId);
            if (goal == null) return false;
            _db.Remove(goal);
            _db.SaveChanges();
            return true;
        }

    }
}