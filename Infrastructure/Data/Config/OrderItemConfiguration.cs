using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        /// <summary>
        /// Método para configurar entidad OrderItem.
        /// Se ejecuta automáticamente cuando se invoca el método
        /// ApplyConfigurationsFromAssembly de la variable modelBuilder al
        /// hacer override de OnModelCreating.
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.OwnsOne( i => i.ItemOrdered, 
                io => { io.WithOwner();});
            builder.Property(i => i.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}