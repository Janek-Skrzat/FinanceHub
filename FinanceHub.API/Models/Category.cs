using System.ComponentModel.DataAnnotations;
namespace FinanceHub.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        public User? User { get; set; }
    }
}
