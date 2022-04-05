using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;

namespace API.Interfaces
{
    public class TokenService : ITokenServices
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreteToken(AppUser user)
        {
            var claims = new List<Claim>
           {
               new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
           };
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var TokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(6),
                SigningCredentials = cred
            };
            var TokenHandler = new JwtSecurityTokenHandler();
            var token= TokenHandler.CreateToken(TokenDescriptor);
            return TokenHandler.WriteToken(token);
        }
    }
}
