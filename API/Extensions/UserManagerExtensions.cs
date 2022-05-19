using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        /// <summary>
        /// Extension method for the user manager.
        /// This will load the User's Address 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static async Task<AppUser> FindByEmailFromClaimsPrincipleWithAddressAsync(
            this UserManager<AppUser> input, ClaimsPrincipal user)
        {            
            var email = user.FindFirstValue(ClaimTypes.Email);
            return await input.Users.Include(x => x.Address).FirstOrDefaultAsync( x => x.Email == email);
        }

        /// <summary>
        /// Extension method for the user manager.
        /// This will NOT load the User's Address 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static async Task<AppUser> FindByEmailFromClaimsPrincipleAsync(
            this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return await input.Users.FirstOrDefaultAsync( x => x.Email == email);
        }
    }
}