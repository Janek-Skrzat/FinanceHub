using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class TransactionService
    {
        private readonly AppDbContext _db;
        public TransactionService(AppDbContext db)
        {
            _db = db;
        }
        public List<Transaction> GetAll(int userId, DateTime? dateFrom = null, DateTime? dateTo = null, int? subCategoryId = null)
        {
            var query = _db.Transactions
                .Where(t => t.UserId == userId);

            if (dateFrom.HasValue)
                query = query.Where(t => t.Date >= dateFrom.Value);

            if (dateTo.HasValue)
                query = query.Where(t => t.Date <= dateTo.Value);

            if (subCategoryId.HasValue)
                query = query.Where(t => t.SubCategoryId == subCategoryId.Value);

            return query
                .OrderByDescending(t => t.Date)
                .ToList();
        }
        public Transaction? GetById(int id, int userId)
        {
            return _db.Transactions
        .FirstOrDefault(t => t.Id == id && t.UserId == userId);
        }
        public Transaction Create(int userId, int subCategoryId, decimal amount, string currency, string type, DateTime date, string? description)
        {
            if (type != "income" && type != "expense")
                throw new Exception("Typ musi być 'income' lub 'expense'");
            var transaction = new Transaction
            {
                UserId = userId,
                SubCategoryId = subCategoryId,
                Amount = amount,
                Currency = currency,
                Type = type,
                Date = date,
                Description = description
            };

            _db.Add(transaction);
            _db.SaveChanges();
            return transaction;
        }
        public Transaction? Update(int id, int userId, decimal amount, string currency, string type, DateTime date, string? description)
        {
            Transaction? transaction = GetById(id, userId);
            if (transaction == null) return null;

            if (type != "income" && type != "expense")
                throw new Exception("Typ musi być 'income' lub 'expense'");

            transaction.Amount = amount;
            transaction.Currency = currency;
            transaction.Type = type;
            transaction.Date = date;
            transaction.Description = description;

            _db.SaveChanges();
            return transaction;
        }
        public bool Delete(int id, int userId)
        {
            Transaction? transaction = GetById(id, userId);
            if (transaction == null)
            {
                return false;
            }
            _db.Remove(transaction);
            _db.SaveChanges();
            return true;
        }
    }
}