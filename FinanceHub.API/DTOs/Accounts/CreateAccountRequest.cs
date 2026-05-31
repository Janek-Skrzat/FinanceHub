using System.ComponentModel.DataAnnotations;

namespace FinanceHub.API.DTOs.Accounts;

public class CreateAccountRequest
{
    [MaxLength(100)]
    public required string Name { get; set; }
    [MaxLength(50)]
    public required string Type { get; set; }
    public decimal Balance { get; set; }
    [MaxLength(3)]
    public required string Currency { get; set; }
    public decimal? InterestRate { get; set; }
    public DateTime? MaturityDate { get; set; }
}