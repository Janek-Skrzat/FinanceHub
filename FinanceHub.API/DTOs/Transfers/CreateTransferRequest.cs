using System.ComponentModel.DataAnnotations;

namespace FinanceHub.API.DTOs.Transfers;

public class CreateTransferRequest
{
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }
        public decimal Amount { get; set; }
        [MaxLength(3)]
        public required string Currency { get; set; }
        public DateTime Date { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }
}