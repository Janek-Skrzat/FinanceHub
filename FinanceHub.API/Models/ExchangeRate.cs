using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceHub.API.Models
{
    public class ExchangeRate
    {
        public int Id { get; set; }
        [MaxLength(3)]
        public required string CurrencyCode { get; set; }
        [Column(TypeName = "decimal(10,6)")]
        public decimal Rate { get; set; }
        public DateTime Date { get; set; }
    }
}
