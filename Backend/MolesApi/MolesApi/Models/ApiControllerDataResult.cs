using Newtonsoft.Json;
using System.Collections.Generic;

namespace MolesApi.Models
{
    public class ApiControllerDataResult<T> where T : class
    {
        [JsonProperty("data")]
        public T Data { get; set; }
        [JsonProperty("errors")]
        public List<JsonApiErrorModel> Errors { get; set; } = new List<JsonApiErrorModel>();
    }

}