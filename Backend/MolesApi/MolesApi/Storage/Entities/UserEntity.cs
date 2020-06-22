using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Collections.Generic;

namespace MolesApi.Storage.StorageModels
{
    public class UserEntity : AzureUser
    {

        public string Name { get; set; }
        public string Lastname { get; set; }
        public string AgeDate { get; set; }
        public string City { get; set; }
        public string Adress { get; set; }
        public string PostalCode { get; set; }
        public string TelephoneNumber { get; set; }

        public UserEntity()
        {
        }

        public override void ReadEntity(IDictionary<string, EntityProperty> properties, OperationContext context)
        {
            foreach (var prop in properties)
            {
                switch (prop.Key.ToLower())
                {
                    case "id":
                        Id = prop.Value.StringValue;
                        break;
                    case "username":
                        UserName = prop.Value.StringValue;
                        break;
                    case "passwordhash":
                        PasswordHash = prop.Value.StringValue;
                        break;
                    case "name":
                        Name = prop.Value.StringValue;
                        break;
                    case "lastname":
                        Lastname = prop.Value.StringValue;
                        break;
                    case "city":
                        City = prop.Value.StringValue;
                        break;
                    case "adress":
                        Adress = prop.Value.StringValue;
                        break;
                    case "postalCode":
                        PostalCode = prop.Value.StringValue;
                        break;
                    case "telephoneNumber":
                        TelephoneNumber = prop.Value.StringValue;
                        break;
                    case "role":
                        Role = prop.Value.StringValue;
                        break;
                    case "agedate":
                        AgeDate = prop.Value.StringValue;
                        break;

                }
            }
        }

        public override IDictionary<string, EntityProperty> WriteEntity(OperationContext context)
        {
            var result = new Dictionary<string, EntityProperty>
            {
                {nameof(UserName), new EntityProperty(UserName.ToUpper())},
                {nameof(PasswordHash), new EntityProperty(PasswordHash)},
                {nameof(Name), new EntityProperty(Name)},
                {nameof(Lastname), new EntityProperty(Lastname)},
                {nameof(Role), new EntityProperty(Role)},
                {nameof(Id), new EntityProperty(Id)},
                {nameof(City), new EntityProperty(City)},
                {nameof(AgeDate), new EntityProperty(AgeDate)},
                {nameof(Adress), new EntityProperty(Adress)},
                {nameof(PostalCode), new EntityProperty(PostalCode)},
                {nameof(TelephoneNumber), new EntityProperty(TelephoneNumber)}
            };
            return result;
        }
    }
}
