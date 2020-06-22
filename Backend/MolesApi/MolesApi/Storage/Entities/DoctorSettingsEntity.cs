using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MolesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MolesApi.Storage.Entities
{
    public class DoctorSettingsEntity:TableEntity
    {
        public DoctorSettings Model { get; set; }

        public override void ReadEntity(IDictionary<string, EntityProperty> properties, OperationContext context)
        {

            string birthDate = "";
            string telephoneNumber = "";
            string adress = "";
            string postalCode = "";
            string city = "";
            string name = "";
            string lastname = "";
            string licenceNumber = "";
            string specialisation = "";

            foreach (var prop in properties)
            {
                switch (prop.Key.ToLower())
                {
                    case "name":
                        name = prop.Value.StringValue;
                        break;
                    case "lastname":
                        lastname = prop.Value.StringValue;
                        break;
                    case "city":
                        city = prop.Value.StringValue;
                        break;
                    case "adress":
                        adress = prop.Value.StringValue;
                        break;
                    case "postalcode":
                        postalCode = prop.Value.StringValue;
                        break;
                    case "telephonenumber":
                        telephoneNumber = prop.Value.StringValue;
                        break;
                    case "agedate":
                        birthDate = prop.Value.StringValue;
                        break;
                    case "licencenumber":
                        licenceNumber = prop.Value.StringValue;
                        break;
                    case "specialisation":
                        specialisation = prop.Value.StringValue;
                        break;

                }
            }

            Model = new DoctorSettings
            {
                Adress = adress,
                AgeDate = birthDate,
                City = city,
                Name = name,
                Lastname = lastname,
                PostalCode = postalCode,
                TelephoneNumber = telephoneNumber,
                LicenceNumber =licenceNumber,
                Specialisation = specialisation
                
            };
        }


        public override IDictionary<string, EntityProperty> WriteEntity(OperationContext context)
        {
            var result = new Dictionary<string, EntityProperty>
            {
                {nameof(Model.Name), new EntityProperty(Model.Name)},
                {nameof(Model.Lastname), new EntityProperty(Model.Lastname)},
                {nameof(Model.City), new EntityProperty(Model.City)},
                {nameof(Model.AgeDate), new EntityProperty(Model.AgeDate)},
                {nameof(Model.Adress), new EntityProperty(Model.Adress)},
                {nameof(Model.PostalCode), new EntityProperty(Model.PostalCode)},
                {nameof(Model.LicenceNumber), new EntityProperty(Model.LicenceNumber)},
                {nameof(Model.Specialisation), new EntityProperty(Model.Specialisation)},
                {nameof(Model.TelephoneNumber), new EntityProperty(Model.TelephoneNumber)}
            };
            return result;
        }
    }
}

