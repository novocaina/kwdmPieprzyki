using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MolesApi.Models;
using MolesApi.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MolesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private IImageBlobsLogic _imagesLogic;

        public FilesController(IImageBlobsLogic imagesLogic)
        {
            _imagesLogic = imagesLogic;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImages(string id)
        {
            try
            {
                var list = await _imagesLogic.ListImagesBlobsNamesAsync(id).ConfigureAwait(false);
                
                return Ok(new ApiControllerDataResult<List<string>> { Data = list });
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

        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadImages(IFormFile file, string id)
        {
            try
            {
                var fileName = file.FileName;
                var name = $"{id}/{fileName}";
                var image = file.OpenReadStream();
                await _imagesLogic.AddNewBlobImageAsync(image, name).ConfigureAwait(false);
                var newImage = await _imagesLogic.GetImageUrlFromGroupAsync(id, fileName).ConfigureAwait(false);
                return Ok(new ApiControllerDataResult<string> { Data = newImage });
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

        [HttpGet("description/{id}/{name}")]
        public async Task<IActionResult> GetDescription(string id, string name)
        {
            try
            {
                var newImage = await _imagesLogic.GetMetadataAsync(id, name).ConfigureAwait(false);
                return Ok(new ApiControllerDataResult<IDictionary<string, string>> { Data = newImage });
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

        [HttpPost("uploadDescription/{id}/{name}")]
        public async Task<IActionResult> AddDescription(string name, string id, string description)
        {
            try
            {
                await _imagesLogic.SetMetadataAsync(id, name, description);
                return Ok(new ApiControllerDataResult<string> { Data = "ok" });
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

        [HttpGet("images/{id}")]
        public async Task<IActionResult> GetImagesWithDesc(string id)
        {
            try
            {
                var url = "https://moles.blob.core.windows.net/images/";
                var result = new List<Image>();
                var list = await _imagesLogic.ListImagesBlobsNamesAsync(id).ConfigureAwait(false);
                foreach(var uri in list)
                {
                    var newUri = uri.Replace(url, "");
                    var names = newUri.Split('/');
                    var group = names[0];
                    var photo = names[1].Split('?')[0];
                    var newImage = await _imagesLogic.GetMetadataAsync(id, photo).ConfigureAwait(false);
                    result.Add(new Image { Path = uri, Descriptions = newImage });
                }
                return Ok(new ApiControllerDataResult<List<Image>> { Data = result });
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
    }
}
