using System.ComponentModel.DataAnnotations;
namespace FinanceHub.API.Models
{
    public class SubCategory
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        public Category? Category { get; set; }
    }
}
