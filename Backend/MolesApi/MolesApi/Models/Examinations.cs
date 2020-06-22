using MolesApi.Storage;
using System.Collections.Generic;

namespace MolesApi.Controllers
{
    public class Examinations : BaseModel
    {
        public List<Exams> Exams { get; set; }
    }
}