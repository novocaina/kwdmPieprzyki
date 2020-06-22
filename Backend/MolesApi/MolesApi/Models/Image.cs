using System.Collections.Generic;

namespace MolesApi.Models
{
    public class Image
    {
        public string Path { get; set; }
        public IDictionary<string, string> Descriptions { get; set; } = new Dictionary<string, string>();
    }
}
