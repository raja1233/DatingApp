using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _dataContext;

        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [AllowAnonymous]
        [HttpGet("Users")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _dataContext.Users.ToListAsync();
        }
        [Authorize]
        //api/GetUsers/1
        [HttpGet("{id}")]
        public async Task<ActionResult <AppUser>> GetUsers(int id)
        {
            return await _dataContext.Users.FindAsync(id);
        }
    }
}
