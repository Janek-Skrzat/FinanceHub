using Microsoft.EntityFrameworkCore;
using FinanceHub.API.Models;

namespace FinanceHub.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}