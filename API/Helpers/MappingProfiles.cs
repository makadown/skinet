using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(dest => dest.ProductBrand,
                          opt => opt.MapFrom(source => source.ProductBrand.Name))
                .ForMember(dest => dest.ProductType,
                          opt => opt.MapFrom(source => source.ProductType.Name))
                .ForMember(dest => dest.PictureUrl,
                            opt => opt.MapFrom<ProductUrlResolver>());
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            // This is because here we are focusing in the data that is incoming to our server.
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember( dest => dest.DeliveryMethod, 
                    opt => opt.MapFrom(source => source.DeliveryMethod.ShortName))
                .ForMember( dest => dest.ShippingPrice,
                    opt => opt.MapFrom( s => s.DeliveryMethod.Price ));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember( dest => dest.ProductId, 
                    opt => opt.MapFrom(source => source.ItemOrdered.ProductItemId))
                .ForMember( dest => dest.ProductName, 
                    opt => opt.MapFrom(source => source.ItemOrdered.ProductName))
                .ForMember( dest => dest.PictureUrl, 
                    opt => opt.MapFrom(source => source.ItemOrdered.PictureUrl))
                .ForMember(dest => dest.PictureUrl,
                            opt => opt.MapFrom<OrderItemUrlResolver>());
        }
    }
}