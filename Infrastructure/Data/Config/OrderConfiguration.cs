using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    /// <summary>
    /// This is going to "tell" entity framework about the properties
    /// that our order owns.
    /// </summary>
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        /// <summary>
        /// Método para configurar entidad Order.
        /// Se ejecuta automáticamente cuando se invoca el método
        /// ApplyConfigurationsFromAssembly de la variable modelBuilder al
        /// hacer override de OnModelCreating.
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne( o => o.ShiptoAddress, a=> 
            {
                a.WithOwner();
            });
            builder.Property(s => s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
                );
            builder.HasMany(o => o.OrderItems).WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}