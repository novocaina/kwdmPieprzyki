using System.Collections.Generic;

namespace MolesApi.Controllers
{
    public class Exams
    {
        public string Date { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public List<string> Medicaments { get; set; }
    }
}