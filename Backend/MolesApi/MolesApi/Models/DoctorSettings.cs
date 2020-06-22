namespace MolesApi.Models
{
    public class DoctorSettings : PersonalDataSettings
    {
        public string LicenceNumber { get; set; }
        public string Specialisation { get; set; }
    }
}
