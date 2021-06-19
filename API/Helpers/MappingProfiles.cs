using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(destiny => destiny.ProductBrand, 
                          opt => opt.MapFrom( source => source.ProductBrand.Name ))
                .ForMember(destiny => destiny.ProductType, 
                          opt => opt.MapFrom( source => source.ProductType.Name ));
        }
    }
}