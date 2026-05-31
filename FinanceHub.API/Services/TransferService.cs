using System.Data.Common;
using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class TransferService
    {
        private readonly AppDbContext _db;
        public TransferService(AppDbContext db)
        {
            _db = db;
        }
        public List<Transfer> GetAll(int userId)
        {
            return _db.Transfers
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .ToList();
        }
        public Transfer Execute(int userId, int fromAccountId, int toAccountId, decimal amount, string currency, DateTime date, string? description)
        {
            var fromAccount = _db.Accounts.FirstOrDefault(a => a.Id == fromAccountId && a.UserId == userId);
            if (fromAccount == null) throw new Exception("Konto źródłowe nie istnieje");

            var toAccount = _db.Accounts.FirstOrDefault(a => a.Id == toAccountId && a.UserId == userId);
            if (toAccount == null) throw new Exception("Konto docelowe nie istnieje");

            if (fromAccount.Balance < amount) throw new Exception("Niewystarczające środki");

            using var transaction = _db.Database.BeginTransaction();
            try
            {
                fromAccount.Balance -= amount;
                toAccount.Balance += amount;

                var transfer = new Transfer
                {
                    UserId = userId,
                    FromAccountId = fromAccountId,
                    ToAccountId = toAccountId,
                    Amount = amount,
                    Currency = currency,
                    Date = DateTime.SpecifyKind(date, DateTimeKind.Utc),
                    Description = description
                };

                _db.Transfers.Add(transfer);
                _db.SaveChanges();
                transaction.Commit();
                return transfer;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
