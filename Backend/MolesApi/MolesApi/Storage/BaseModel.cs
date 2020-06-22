using Newtonsoft.Json;

namespace MolesApi.Storage
{
    public class BaseModel
    {
        [JsonProperty("id")]
        public string Id { get;  set; }
    }
}