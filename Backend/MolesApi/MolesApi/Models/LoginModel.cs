namespace MolesApi.Models
{
    public class LoginModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

    }

    public class RegistrationModel : PersonalDataSettings
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string UserRole { get; set; }
    }
}
