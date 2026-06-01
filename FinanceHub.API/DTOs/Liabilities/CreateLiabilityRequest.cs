using System.ComponentModel.DataAnnotations;

namespace FinanceHub.API.DTOs.Liabilities;

public class CreateLiabilityRequest
{
    [MaxLength(100)]
    public required string Name { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal RemainingAmount { get; set; }
    public decimal MonthlyPayment { get; set; }
    public DateTime? Deadline { get; set; }
}