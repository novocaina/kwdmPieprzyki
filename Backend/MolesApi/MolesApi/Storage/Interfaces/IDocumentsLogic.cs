using System.Threading.Tasks;

namespace MolesApi.Storage.Interfaces
{
    public interface IDocumentsLogic
    {
        Task<T> GetDocumentAsync<T>(BaseModel document);

        Task<ResultModel> CreateOrUpdateDocumentAsync<T>(T document) where T : BaseModel;
    }
}
