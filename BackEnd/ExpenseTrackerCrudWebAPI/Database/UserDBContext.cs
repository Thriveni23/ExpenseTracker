using ExpenseTrackerCrudWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerCrudWebAPI.Database
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
