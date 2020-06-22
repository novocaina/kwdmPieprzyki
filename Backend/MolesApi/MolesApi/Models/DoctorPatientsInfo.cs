using System.Collections.Generic;

namespace MolesApi.Models
{
    public class DoctorPatientsInfo
    {
        public List<string> PatientsID { get; set; } = new List<string>();
        public List<PatientInfo> Info { get; set; } = new List<PatientInfo>();
    }
}
