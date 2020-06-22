using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MolesApi.Storage.Interfaces
{
    public interface IImageBlobsLogic
    {
        Task<List<string>> ListImagesBlobsNamesAsync(string id);
        Task<string> GetImageUrlFromGroupAsync(string id, string name);
        Task AddNewBlobImageAsync(Stream image, string name);
        Task<IDictionary<string, string>> GetMetadataAsync(string id, string name);
        Task SetMetadataAsync(string id, string name, string desc);
    }
}
