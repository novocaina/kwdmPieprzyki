using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MolesApi.Models;
using MolesApi.Storage;
using MolesApi.Storage.Repositories;
using MolesApi.Storage.StorageModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MolesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly IUserRepository _userRepository;
        public AccountController(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager, IAppConfiguration appConfiguration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _userRepository = new UserRepository(appConfiguration);
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                var cookies = Request.Cookies.Keys;
                foreach (var cookie in cookies)
                {
                    Response.Cookies.Delete(cookie, new Microsoft.AspNetCore.Http.CookieOptions()
                    {
                        Domain = Request.Host.Host
                    });
                }

            }
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {

            if (ModelState.IsValid)
            {
                bool userExist = await _userRepository.CheckIfUserExist(loginModel.Login.ToUpper());

                if (!userExist)
                {
                    return Ok(new ApiControllerDataResult<object>
                    {
                        Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Login",
                        Detail ="User not exist"
                    }}
                    });
                }

                var result = await _signInManager.PasswordSignInAsync(loginModel.Login, loginModel.Password, true, false);
                if (result.Succeeded)
                {
                    var entity = _userRepository.GetUserFromTable(loginModel.Login.ToUpper()).Result;
                    var user = new SimpleUser { Id = entity.Id, UserRole = entity.Role };
                    return Ok(new ApiControllerDataResult<SimpleUser> { Data = user });
                }
                else
                {
                    return Ok(new ApiControllerDataResult<object>
                    {
                        Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Password",
                        Detail ="User not exist"
                    }}
                    });
                }
            }

            return BadRequest();
        }



        [HttpPost("registration")]
        public async Task<IActionResult> Register(RegistrationModel registration)
        {

            if (!ModelState.IsValid)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>()
                { new JsonApiErrorModel
                    {
                        Title ="Model isn't valid exist",
                        Detail ="Bad values"
                    }
                }
                });

            }

            bool userExist = await _userRepository.CheckIfUserExist(registration.Login.ToUpper());

            if (userExist)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>()
                { new JsonApiErrorModel
                    {
                        Title ="User exist",
                        Detail ="This login exist"
                    }
                }
                }
                );
            }

            var user = new UserEntity { UserName = registration.Login, Role = registration.UserRole };
            var result = await _userManager.CreateAsync(user, registration.Password);

            if (!result.Errors.Any())
            {
                await _signInManager.SignInAsync(user, false);
                if (registration.UserRole.ToLower() == "user")
                {
                    var model = new PersonalDataSettings
                    {
                        Name = registration.Name,
                        Lastname = registration.Lastname,
                        City = registration.City,
                        Adress = registration.Adress,
                        PostalCode = registration.PostalCode,
                        TelephoneNumber = registration.TelephoneNumber
                    };
                    await _userRepository.AddOrUpdateUserAsync(model, user.Id);
                }
                else
                {
                    var model = new DoctorSettings
                    {
                        Name = registration.Name,
                        Lastname = registration.Lastname,
                        City = registration.City,
                        Adress = registration.Adress,
                        PostalCode = registration.PostalCode,
                        TelephoneNumber = registration.TelephoneNumber,
                        LicenceNumber = "0000",
                        Specialisation = "ogolna"
                    };
                    await _userRepository.AddOrUpdateDoctorAsync(model, user.Id);
                }
                return Ok(new ApiControllerDataResult<UserEntity> { Data = user });
            }
            else
            {
                var errors = new List<JsonApiErrorModel>();
                foreach (var error in result.Errors)
                {
                    errors.Add(new JsonApiErrorModel { Title = "Registation error", Detail = error.Description });
                }
                return Ok(new ApiControllerDataResult<object> { Errors = errors });
            }
        }
    }
}

