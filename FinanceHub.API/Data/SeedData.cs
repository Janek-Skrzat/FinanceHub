using FinanceHub.API.Models;

namespace FinanceHub.API.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Categories.Any())
                return;

            var categories = new List<Category>
            {
                new Category { Name = "Jedzenie" },
                new Category { Name = "Transport" },
                new Category { Name = "Mieszkanie" },
                new Category { Name = "Rozrywka" },
                new Category { Name = "Zdrowie" },
                new Category { Name = "Ubrania" },
                new Category { Name = "Oszczednosci" },
                new Category { Name = "Inne" },
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();
        }
    }
}