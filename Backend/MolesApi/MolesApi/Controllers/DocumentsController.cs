using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MolesApi.Models;
using MolesApi.Storage;
using MolesApi.Storage.Interfaces;
using MolesApi.Storage.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MolesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentsController : ControllerBase
    {
        private IDocumentsLogic _docLogic;
        private readonly IUserRepository _userRepository;

        public DocumentsController(IDocumentsLogic docLogic,IAppConfiguration appConfiguration)
        {
            _userRepository = new UserRepository(appConfiguration);
            _docLogic = docLogic;
        }

        [HttpGet("patients/{id}")]
        public async Task<IActionResult> GetPatients(string id)
        {
            try
            {
                var model = new BaseModel { Id = id };
                var list = await _docLogic.GetDocumentAsync<Patients>(model);
                var result = new DoctorPatientsInfo { PatientsID = list.PatientsList };
                foreach(var idPatient in list.PatientsList)
                {
                    var user = await _userRepository.GetUserFromId(idPatient);
                    var userModel = new BaseModel { Id = idPatient };
                    var exams = await _docLogic.GetDocumentAsync<Examinations>(userModel);
                    var doctor = await _userRepository.GetDoctorFromId(id);
                    var patient = new PatientInfo { Info = user, Exams = exams.Exams , PatientId = idPatient, Doctor = doctor};
                    result.Info.Add(patient);
                }
                return Ok(new ApiControllerDataResult<DoctorPatientsInfo> { Data = result });
            }
            catch(Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Error",
                        Detail =ex.Message
                    }}
                });
            }
        }

        [HttpGet("allPatients/{id}")]
        public async Task<IActionResult> GetAllPatients(string id)
        {
            try
            {
                var model = new BaseModel { Id = id };
                var list = await _docLogic.GetDocumentAsync<Patients>(model);
                
                return Ok(new ApiControllerDataResult<List<string>> { Data = list.PatientsList });
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Error",
                        Detail =ex.Message
                    }}
                });
            }
        }

        [HttpGet("examinations/{id}")]
        public async Task<IActionResult> GetPatientsExams(string id)
        {
            try
            {
                var model = new BaseModel { Id = id };
                var list = await _docLogic.GetDocumentAsync<Examinations>(model);
                return Ok(new ApiControllerDataResult<Examinations> { Data = list });
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Error",
                        Detail =ex.Message
                    }}
                });
            }
        }

        [HttpPost("patients")]
        public async Task<IActionResult> UploadPatients(Patients doc)
        {
            try
            {
                var data = await _docLogic.CreateOrUpdateDocumentAsync(doc);
                return Ok(new ApiControllerDataResult<ResultModel> { Data = data });
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Error",
                        Detail =ex.Message
                    }}
                });
            }
        }

        [HttpPost("examinations")]
        public async Task<IActionResult> UploadPatientsExams(Examinations doc)
        {
             try
            {
                var data = await _docLogic.CreateOrUpdateDocumentAsync(doc);
                return Ok(new ApiControllerDataResult<ResultModel> { Data = data });
            }
            catch (Exception ex)
            {
                return Ok(new ApiControllerDataResult<object>
                {
                    Errors = new List<JsonApiErrorModel>(){ new JsonApiErrorModel
                    {
                        Title ="Error",
                        Detail =ex.Message
                    }}
                });
            }
        }
    }
}
