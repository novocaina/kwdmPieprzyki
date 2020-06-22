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
    public class DoctorsController : ControllerBase
    {

        private readonly IUserRepository _userRepository;
        public DoctorsController(IAppConfiguration appConfiguration)
        {
            _userRepository = new UserRepository(appConfiguration);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userRepository.GetDoctorFromId(id);
            return Ok(new ApiControllerDataResult<DoctorSettings> { Data = user });
        }

        [HttpGet("allDoctors")]
        public async Task<IActionResult> GetAllDoctors()
        {
            var users = await _userRepository.GettAllDoctors();
            return Ok(new ApiControllerDataResult<List<DoctorSettingsEntity>> { Data = users });
        }

        [HttpPost("addOdUpdate/{id}")]
        public async Task<IActionResult> UpdateUser(string id, DoctorSettings model)
        {
            try
            {
                await _userRepository.AddOrUpdateDoctorAsync(model, id);
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
                await _userRepository.DeleteDoctorEntity(id);
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
    }
}