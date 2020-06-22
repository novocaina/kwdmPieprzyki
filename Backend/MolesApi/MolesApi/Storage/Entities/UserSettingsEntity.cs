using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MolesApi.Models;
using System.Collections.Generic;

namespace MolesApi.Storage.Entities
{
    public class UserSettingsEntity : TableEntity
    {
        public PersonalDataSettings Model { get; set; }

        public override void ReadEntity(IDictionary<string, EntityProperty> properties, OperationContext context)
        {

            string ageDate = "";
            string telephoneNumber = "";
            string adress = "";
            string postalCode = "";
            string city = "";
            string name = "";
            string lastname = "";

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
                        ageDate = prop.Value.StringValue;
                        break;

                }
            }

            Model = new PersonalDataSettings
            {
                Adress = adress,
                AgeDate = ageDate,
                City = city,
                Name = name,
                Lastname = lastname,
                PostalCode = postalCode,
                TelephoneNumber = telephoneNumber,
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
                {nameof(Model.TelephoneNumber), new EntityProperty(Model.TelephoneNumber)}
            };
            return result;
        }
    }
}
