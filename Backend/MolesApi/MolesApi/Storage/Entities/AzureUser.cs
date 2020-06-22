using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace MolesApi.Storage.StorageModels
{
    public class AzureUser : TableEntity
    {
        public AzureUser()
        {
            PartitionKey = Guid.NewGuid().ToString();
            RowKey = Guid.NewGuid().ToString();
            Id = RowKey;
        }

        public AzureUser(string userName) : this()
        {
            UserName = userName;
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string Role { get; set; }
    }

}
