using Microsoft.EntityFrameworkCore;
using TESTE_API.Entities;

namespace TESTE_API.Infraestrutura
{
    public class ConnectionContext : DbContext
    {
        public DbSet<Funcionarios> Funcionarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseNpgsql(
            "Server=pim-database.czpldp3qvtb6.us-east-1.rds.amazonaws.com;" +
            "Port=5432;Database=postgres;" +
            "User Id=postgres;" +
            "Password=pimdatabase123;"
            );
    }
}
    