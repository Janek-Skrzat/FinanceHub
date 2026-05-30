using System.ComponentModel.DataAnnotations;

namespace FinanceHub.API.DTOs.Transactions;

public class UpdateTransactionRequest
{
    public decimal Amount { get; set; }
    [MaxLength(3)]
    public required string Currency { get; set; }
    [MaxLength(10)]
    public required string Type { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
}