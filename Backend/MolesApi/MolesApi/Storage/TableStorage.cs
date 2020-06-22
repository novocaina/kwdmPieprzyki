using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Threading.Tasks;

namespace MolesApi.Storage
{
    public class TableStorage
    {
        private readonly IAppConfiguration Configuration;

        public TableStorage(IAppConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<CloudTable> GetTableReference(string tableName)
        {
            var connection = Configuration.GetConnectionString("StorageConnectionString");
            var storageAccount = CloudStorageAccount.Parse(connection);
            var tableClient = storageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(tableName);
            await table.CreateIfNotExistsAsync();
            return table;
        }

    }
}
