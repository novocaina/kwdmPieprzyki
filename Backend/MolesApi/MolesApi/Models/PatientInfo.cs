using MolesApi.Controllers;
using System.Collections.Generic;

namespace MolesApi.Models
{
    public class PatientInfo
    {
        public PersonalDataSettings Info { get; set; }
        public List<Exams> Exams { get; set; } = new List<Exams>();
        public string PatientId { get; set; }

        public DoctorSettings Doctor { get; set; }
    }
}