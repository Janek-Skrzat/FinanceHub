using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceHub.API.Models
{
    public class Transfer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        [MaxLength(3)]
        public required string Currency { get; set; }
        public DateTime Date { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }
        public Account? FromAccount { get; set; }
        public Account? ToAccount { get; set; }
    }
}
