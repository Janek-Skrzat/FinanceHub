using FinanceHub.API.Data;
using FinanceHub.API.Models;

namespace FinanceHub.API.Services
{
    public class CurrencyService
    {
        private readonly AppDbContext _db;
        private readonly HttpClient _httpClient;

        public CurrencyService(AppDbContext db, HttpClient httpClient)
        {
            _db = db;
            _httpClient = httpClient;
        }

        public async Task<decimal> GetRate(string currencyCode)
        {
            if (currencyCode == "PLN") return 1.0m;

            var today = DateTime.UtcNow.Date;
            var cached = _db.ExchangeRates
                .FirstOrDefault(e => e.CurrencyCode == currencyCode && e.Date >= today);

            if (cached != null) return cached.Rate;

            var url = $"https://api.nbp.pl/api/exchangerates/rates/A/{currencyCode}/?format=json";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadFromJsonAsync<NbpResponse>();
            var rate = json!.Rates[0].Mid;

            _db.ExchangeRates.Add(new ExchangeRate
            {
                CurrencyCode = currencyCode,
                Rate = rate,
                Date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc)
            });
            _db.SaveChanges();

            return rate;
        }
    }

    public class NbpResponse
    {
        public List<NbpRate> Rates { get; set; } = new();
    }

    public class NbpRate
    {
        public decimal Mid { get; set; }
    }
}