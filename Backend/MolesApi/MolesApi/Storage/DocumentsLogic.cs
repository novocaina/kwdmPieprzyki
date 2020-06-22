using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using MolesApi.Storage.Interfaces;
using System;
using System.Threading.Tasks;

namespace MolesApi.Storage
{
    public class DocumentsLogic : IDocumentsLogic
    {

        private readonly DocumentClient _documentClient;
        private readonly Uri _uri;
        private readonly string _databaseName;
        private readonly string _collectionName;
        private readonly IAppConfiguration _configuration;

        public DocumentsLogic(IAppConfiguration configurationProvider)
        {
            _configuration = configurationProvider;
            _databaseName = _configuration.GetVariable("cosmosDb-DatabaseName");
            _collectionName = _configuration.GetVariable("cosmosDb-CollectionName");
            var endpointUri = new Uri(_configuration.GetVariable("cosmosDb-EndpointUri"));
            var primaryKey = _configuration.GetVariable("cosmosDb-PrimaryAuthorizationKey");
            _documentClient = new DocumentClient(endpointUri, primaryKey, new ConnectionPolicy
            {
                ConnectionMode = ConnectionMode.Direct,
                ConnectionProtocol = Protocol.Tcp
            });

            _uri = UriFactory.CreateDocumentCollectionUri(_databaseName, _collectionName);
        }

        public async Task<T> GetDocumentAsync<T>(BaseModel document)
        {
            if (string.IsNullOrWhiteSpace(document.Id))
            {
                throw new ArgumentNullException(nameof(document.Id));
            }

            try
            {
              
                var uri = UriFactory.CreateDocumentUri(_databaseName, _collectionName, document.Id).OriginalString;
                var doc = await _documentClient.ReadDocumentAsync<T>(uri).ConfigureAwait(false);


                return doc;
            }
            catch (DocumentClientException e)
            {

                throw;

            }
        }

        public async Task<ResultModel> CreateOrUpdateDocumentAsync<T>(T document) where T : BaseModel
        {
            try
            {
                if (string.IsNullOrWhiteSpace(document.Id))
                {
                    document.Id = Guid.NewGuid().ToString();
                }
                
                var result = await UpsertDocumentAsync(document).ConfigureAwait(false);
                return ReturnResultModel(result);
            }
            catch (DocumentClientException e)
            {

                return new ResultModel
                {
                    Exception = e
                };
            }
            catch (Exception e)
            {

                return new ResultModel
                {
                    Exception = e
                };
            }
        }

      

        private Task<ResourceResponse<Document>> UpsertDocumentAsync(BaseModel document)
        {
            return _documentClient.UpsertDocumentAsync(_uri, document);
        }

        private ResultModel ReturnResultModel(ResourceResponse<Document> result)
        {

            return new ResultModel
            {

                Id = result.Resource.Id,
                StatusCode = result.StatusCode.ToString()

            };
        }
    }
}

