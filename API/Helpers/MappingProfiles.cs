using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

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
            CreateMap<Address, AddressDto>().ReverseMap();
            // This is because here we are focusing in the data that is incoming to our server.
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}