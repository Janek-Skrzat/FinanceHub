using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceHub.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? AccountId { get; set; }
        public int SubCategoryId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        [MaxLength(3)]
        public required string Currency { get; set; }
        [MaxLength(10)]
        public required string Type { get; set; }
        public DateTime Date { get; set; }
        [MaxLength(500)]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }
        public SubCategory? SubCategory { get; set; }
    }
}
