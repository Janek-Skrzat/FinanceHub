using System.ComponentModel.DataAnnotations;
namespace FinanceHub.API.Models
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public required string FirstName { get; set; }
        [MaxLength(100)]
        public required string LastName { get; set; }
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(255)]
        public required string PasswordHash { get; set; }
        [MaxLength(3)]
        public string DefaultCurrency { get; set; } = "PLN";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
