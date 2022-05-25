using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    /// <summary>
    /// Configuracion de entidad Product.
    /// Este se hara override en StoreContext
    /// </summary>
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        /// <summary>
        /// Método para configurar entidad Product.
        /// Se ejecuta automáticamente en Storecontext.cs cuando se invoca el método
        /// ApplyConfigurationsFromAssembly de la variable modelBuilder al
        /// hacer override de OnModelCreating.
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.HasOne(b => b.ProductBrand).WithMany()
                .HasForeignKey(p => p.ProductBrandId);
            builder.HasOne(b => b.ProductType).WithMany()
                .HasForeignKey(p => p.ProductTypeId);
        }
    }
}