using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceHub.API.Models
{
    public class Liability
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal RemainingAmount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal MonthlyPayment { get; set; }
        public DateTime? Deadline { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }
    }
}
