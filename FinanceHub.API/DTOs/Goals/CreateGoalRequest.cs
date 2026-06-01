using System.ComponentModel.DataAnnotations;

namespace FinanceHub.API.DTOs.Goals;

public class CreateGoalRequest
{
    [MaxLength(500)]
    public required string Name { get; set; }
    public decimal TargetAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public DateTime? Deadline { get; set; }
}