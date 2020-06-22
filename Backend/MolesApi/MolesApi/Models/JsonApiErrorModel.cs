namespace MolesApi.Models
{
    public class JsonApiErrorModel
    {
        public string Title { get; set; }
        public string Detail { get; set; }

        public JsonApiErrorModel()
        {
            Title = "Error";
            Detail = "Unknown error occured";
        }
    }
}
