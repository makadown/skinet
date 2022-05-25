using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class DeliveryMethodConfiguration : IEntityTypeConfiguration<DeliveryMethod>
    {
        /// <summary>
        /// Método para configurar entidad DeliveryMethod.
        /// Se ejecuta automáticamente en Storecontext.cs cuando se invoca el método
        /// ApplyConfigurationsFromAssembly de la variable modelBuilder al
        /// hacer override de OnModelCreating.
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<DeliveryMethod> builder)
        {
            builder.Property(d => d.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}