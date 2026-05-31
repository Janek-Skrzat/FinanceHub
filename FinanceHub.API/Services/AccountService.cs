using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class AccountService
    {
        private readonly AppDbContext _db;
        
        public AccountService(AppDbContext db)
        {
            _db = db;
        }
        
        public List<Account> GetAll(int userId)
        {
            return _db.Accounts
                .Where(a => a.UserId == userId)
                .ToList();
        }
        
        public Account? GetById(int id, int userId)
        {
            return _db.Accounts
                .FirstOrDefault(a => a.Id == id && a.UserId == userId);
        }
        
        public Account Create(int userId, string name, string type, decimal balance, string currency, decimal? interestRate, DateTime? maturityDate)
        {
            var account = new Account
            {
                UserId = userId,
                Name = name,
                Type = type,
                Balance = balance,
                Currency = currency,
                InterestRate = interestRate,
                MaturityDate = maturityDate
            };
            _db.Add(account);
            _db.SaveChanges();
            return account;
        }
        
        public Account? Update(int id, int userId, string name, string type, decimal balance, string currency, decimal? interestRate, DateTime? maturityDate)
        {
            Account? account = GetById(id, userId);
            if (account == null) return null;

            account.Name = name;
            account.Type = type;
            account.Balance = balance;
            account.Currency = currency;
            account.InterestRate = interestRate;
            account.MaturityDate = maturityDate;

            _db.SaveChanges();
            return account;
        }
        
        public bool Delete(int id, int userId)
        {
            Account? account = GetById(id, userId);
            if (account == null)
            {
                return false;
            }
            _db.Remove(account);
            _db.SaveChanges();
            return true;
        }
    }
}