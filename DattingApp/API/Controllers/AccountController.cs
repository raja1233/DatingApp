using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenServices _tokenServices;

        public AccountController(DataContext context,ITokenServices tokenServices)
        {
            _context=context;
            _tokenServices = tokenServices;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();
            var _exists = await UserExists(registerDto.userName);
            if(_exists)
            {
                return BadRequest("user is already taken");
            }
            var user = new AppUser()
            {
                UserName = registerDto.userName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await  _context.SaveChangesAsync();
            return new UserDto()
            {
                UserName = user.UserName,
                Token = _tokenServices.CreteToken(user)
            };
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.userName);
            if(user==null)
                return Unauthorized("Invalid UserName");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if (ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return new UserDto()
            {
                UserName = user.UserName,
                Token = _tokenServices.CreteToken(user)
            };
        }
        private async Task<bool> UserExists(string userName)
        {
            var res = await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
            return res;
        }

    }
}