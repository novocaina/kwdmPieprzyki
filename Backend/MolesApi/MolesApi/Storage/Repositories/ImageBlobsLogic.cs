using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using MolesApi.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MolesApi.Storage.Repositories
{
    internal class ImageBlobsLogic : IImageBlobsLogic
    {
        private CloudBlobClient _blobClient;
        private string _blobContainerName;
        private readonly IAppConfiguration _appConfiguration;
        private CloudBlobContainer _container;

        public ImageBlobsLogic(IAppConfiguration appConfiguration)
        {
            _appConfiguration = appConfiguration;
            _blobContainerName = "images";
        }

        public async Task<List<string>> ListImagesBlobsNamesAsync(string id)
        {
            var list = await ListImageNamesAsync(id).ConfigureAwait(false);
            var result = new List<string>();
            foreach (var blob in list)
            {
                result.Add(SetAccessSignatureAndNewUri(blob));
            }
            return result;
        }

        private string SetAccessSignatureAndNewUri(CloudBlob blob)
        {
            var builder = new UriBuilder(blob.Uri)
            {
                Query = blob.GetSharedAccessSignature(
                new SharedAccessBlobPolicy
                {
                    Permissions = SharedAccessBlobPermissions.Read,
                    SharedAccessStartTime = new DateTimeOffset(DateTime.UtcNow.AddMinutes(-5)),
                    SharedAccessExpiryTime = new DateTimeOffset(DateTime.UtcNow.AddHours(2))
                })
            };
            return builder.Uri.ToString();
        }

        public async Task AddNewBlobImageAsync(Stream image, string blobName)
        {
            await PrepareBlobConnectionAsync().ConfigureAwait(false);
            var container = _blobClient.GetContainerReference(_blobContainerName);
            var blockBlob = container.GetBlockBlobReference(blobName);
            blockBlob.Properties.ContentType = "image/jpg";

            await blockBlob.UploadFromStreamAsync(image).ConfigureAwait(false);
        }

        public async Task<string> GetImageUrlFromGroupAsync(string group, string name)
        {
            var list = await ListImageNamesAsync(group).ConfigureAwait(false);

            var blob = list.Where(x => x.Name.Contains(name)).FirstOrDefault();
            if (blob != null)
            {
                return SetAccessSignatureAndNewUri(blob);
            }
            return string.Empty;
        }
        private async Task PrepareBlobConnectionAsync()
        {
            var connString = _appConfiguration.GetConnectionString("StorageConnectionString");
            if (!CloudStorageAccount.TryParse(connString, out var storageAccount))
            {
                throw new ArgumentException("Invalid Cloud Storage Account connection string.", connString);
            }
            if (string.IsNullOrWhiteSpace(_blobContainerName))
            {
                throw new ArgumentNullException(_blobContainerName);
            }

            _blobClient = storageAccount.CreateCloudBlobClient();
            _blobClient.DefaultRequestOptions = new BlobRequestOptions
            {
                RetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(1), 6),
                MaximumExecutionTime = TimeSpan.FromSeconds(70)
            };

            _container = _blobClient.GetContainerReference(_blobContainerName);
            var exists = await _container.ExistsAsync().ConfigureAwait(false);
            if (!exists)
            {
                await _blobClient.GetContainerReference(_blobContainerName).CreateAsync().ConfigureAwait(false);
            }
        }

        private async Task<IEnumerable<CloudBlob>> ListBlobsAsync(CloudBlobContainer container, string prefix = "")
        {
            BlobContinuationToken continuationToken = null;
            BlobResultSegment resultSegment;

            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            var list = new List<CloudBlob>();

            do
            {
                resultSegment = await container.ListBlobsSegmentedAsync(prefix, true, BlobListingDetails.Metadata, int.MaxValue, continuationToken, null, null).ConfigureAwait(false);
                list.AddRange(resultSegment.Results.OfType<CloudBlob>());

                continuationToken = resultSegment.ContinuationToken;
            }
            while (continuationToken != null);

            return list;
        }
        private async Task<IEnumerable<CloudBlob>> ListImageNamesAsync(string id)
        {
            await PrepareBlobConnectionAsync().ConfigureAwait(false);
            var container = _blobClient.GetContainerReference(_blobContainerName);

            return await ListBlobsAsync(container, id).ConfigureAwait(false);
        }

        public async Task<IDictionary<string, string>> GetMetadataAsync(string id, string name)
        {
            var list = await ListImageNamesAsync(id).ConfigureAwait(false);

            var blob = list.Where(x => x.Name.Contains(name)).FirstOrDefault();
            return blob.Metadata;
        }

        public async Task SetMetadataAsync(string id, string name, string desc)
        {
            var list = await ListImageNamesAsync(id).ConfigureAwait(false);

            var blob = list.Where(x => x.Name.Contains(name)).FirstOrDefault();
            if (blob.Metadata.ContainsKey("description"))
            {
                blob.Metadata["description"] = desc;
            }
            else
            {
                blob.Metadata.Add("description", desc);
            }
            await blob.SetMetadataAsync();
        }
    }
}

