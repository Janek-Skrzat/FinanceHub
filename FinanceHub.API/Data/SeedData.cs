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

            var transport = context.Categories.First(c => c.Name == "Transport");
            var jedzenie = context.Categories.First(c => c.Name == "Jedzenie");
            var mieszkanie = context.Categories.First(c => c.Name == "Mieszkanie");
            var zdrowie = context.Categories.First(c => c.Name == "Zdrowie");
            var rozrywka = context.Categories.First(c => c.Name == "Rozrywka");

            var subCategories = new List<SubCategory>
            {
                new SubCategory { Name = "Paliwo", CategoryId = transport.Id },
                new SubCategory { Name = "Parking", CategoryId = transport.Id },
                new SubCategory { Name = "Transport publiczny", CategoryId = transport.Id },
                new SubCategory { Name = "Restauracja", CategoryId = jedzenie.Id },
                new SubCategory { Name = "Sklep spozywczy", CategoryId = jedzenie.Id },
                new SubCategory { Name = "Czynsz", CategoryId = mieszkanie.Id },
                new SubCategory { Name = "Media", CategoryId = mieszkanie.Id },
                new SubCategory { Name = "Lekarz", CategoryId = zdrowie.Id },
                new SubCategory { Name = "Apteka", CategoryId = zdrowie.Id },
                new SubCategory { Name = "Kino", CategoryId = rozrywka.Id },
                new SubCategory { Name = "Streaming", CategoryId = rozrywka.Id },
            };

            context.SubCategories.AddRange(subCategories);
            context.SaveChanges();
        }
    }
}