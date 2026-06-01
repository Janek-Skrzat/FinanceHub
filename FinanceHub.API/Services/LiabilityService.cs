using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class LiabilityService
    {
        private readonly AppDbContext _db;

        public LiabilityService(AppDbContext db)
        {
            _db = db;
        }
        public List<Liability> GetAll(int userId)
        {
            return _db.Liabilities
                .Where(a => a.UserId == userId)
                .ToList();
        }
        public Liability? GetById(int id, int userId)
        {
            return _db.Liabilities
                .FirstOrDefault(a => a.Id == id && a.UserId == userId);
        }
        public Liability Create(int userId, string name, decimal totalAmount, decimal remainingAmount, decimal monthlyPayment, DateTime? deadline)
        {
            var liability = new Liability
            {
                UserId = userId,
                Name = name,
                TotalAmount = totalAmount,
                RemainingAmount = remainingAmount,
                MonthlyPayment = monthlyPayment,
                Deadline = deadline
            };
            _db.Add(liability);
            _db.SaveChanges();
            return liability;
        }
        public Liability? Update(int id, int userId, string name, decimal totalAmount, decimal remainingAmount, decimal monthlyPayment, DateTime? deadline)
        {
            Liability? liability = GetById(id, userId);
            if (liability == null) return null;

            liability.Name = name;
            liability.TotalAmount = totalAmount;
            liability.RemainingAmount = remainingAmount;
            liability.MonthlyPayment = monthlyPayment;
            liability.Deadline = deadline;

            _db.SaveChanges();
            return liability;
        }

        public bool Delete(int id, int userId)
        {
            Liability? liability = GetById(id, userId);
            if (liability == null) return false;
            _db.Remove(liability);
            _db.SaveChanges();
            return true;
        }
    }
}