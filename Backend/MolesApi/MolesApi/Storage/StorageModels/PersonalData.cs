using MolesApi.Models;
using System;

namespace MolesApi.Storage.StorageModels
{
    public class PersonalData : PersonalDataSettings
    {
        public int PersonId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public PersonalData(int personId, string login, string password, string name, string lastname,
            string ageDate, string city, string adress, string postalCode, string telephoneNumber)
        {
            PersonId = personId;
            Login = login;
            Password = password;
            Name = name;
            Lastname = lastname;
            AgeDate = ageDate;
            City = city;
            Adress = adress;
            PostalCode = postalCode;
            TelephoneNumber = telephoneNumber;
        }

        public PersonalData()
        {

        }
    }
}
