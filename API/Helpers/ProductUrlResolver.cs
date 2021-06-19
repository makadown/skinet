using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    /// <summary>
    /// Class to use with MappingProfiles to map pictureUrl with the api url set in our
    /// settings.
    /// </summary>
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _config;

        /// <summary>
        /// Constructor
        /// NOTE: this constructor uses Microsoft.Extensions.Configuration, not the AutoMapper one.
        /// </summary>
        /// <param name="config"></param>
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination,
                    string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                // Make sure this property exists in your appsettings.Development.json if developing
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}