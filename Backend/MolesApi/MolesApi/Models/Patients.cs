using MolesApi.Storage;
using System.Collections.Generic;

namespace MolesApi.Controllers
{
    public class Patients : BaseModel
    {
        public List<string> PatientsList { get; set; }
    }
}