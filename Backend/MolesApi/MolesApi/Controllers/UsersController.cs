using Microsoft.AspNetCore.Mvc;
using MolesApi.Models;
using MolesApi.Storage;
using MolesApi.Storage.Entities;
using MolesApi.Storage.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MolesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IAppConfiguration appConfiguration)
        {
            _userRepository = new UserRepository(appConfiguration);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userRepository.GetUserFromId(id);
            return Ok(new ApiControllerDataResult<PersonalDataSettings> { Data = user });
        }

        [HttpPost("addOdUpdate/{id}")]
        public async Task<IActionResult> UpdateUser(string id, PersonalDataSettings model)
        {
            try
            {
                await _userRepository.AddOrUpdateUserAsync(model, id);
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Add or Update",
                        Detail =ex.Message
                    }}
                });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                await _userRepository.DeleteUserEntity(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Delete",
                        Detail =ex.Message
                    }}
                });
            }
        }

        [HttpGet("allUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return Ok(new ApiControllerDataResult<List<UserSettingsEntity>> { Data = users });
        }
    }
}
