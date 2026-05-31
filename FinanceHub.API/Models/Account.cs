using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace FinanceHub.API.Models
{
    public class Account
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        [MaxLength(50)]
        public required string Type { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }
        [MaxLength(3)]
        public required string Currency { get; set; }
        [Column(TypeName = "decimal(5,4)")]
        public decimal? InterestRate { get; set; }
        public DateTime? MaturityDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }
    }
}
