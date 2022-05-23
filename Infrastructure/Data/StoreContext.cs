using System.Linq;
using System.Reflection;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products {get; set;}
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

        /// <summary>
        /// Cuando se efectua una migración, este método se encarga de crear
        /// dicha migración
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            #region this is a SQLite quickfix for an issue that it has with decimal types

            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach(var entityType in modelBuilder.Model.GetEntityTypes() )
                {
                    var properties = entityType.ClrType.GetProperties()
                            .Where(p => p.PropertyType == typeof(decimal));
                    foreach(var property in properties)
                    {
                        modelBuilder.Entity(entityType.Name)
                            .Property(property.Name).HasConversion<double>();
                    }
                }
            }
            
            #endregion
        }
    }
}