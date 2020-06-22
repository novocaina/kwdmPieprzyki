using Microsoft.WindowsAzure.Storage.Table;
using MolesApi.Models;
using MolesApi.Storage.Entities;
using MolesApi.Storage.StorageModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MolesApi.Storage.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TableStorage _tableStorage;
        private readonly string _userTable;
        private readonly string _userSettingsTable;
        private readonly string _doctorTable;

        public UserRepository(IAppConfiguration configuration)
        {
            _tableStorage = new TableStorage(configuration);
            _userTable = configuration.GetVariable("UserTable");
            _userSettingsTable = configuration.GetVariable("UserSettingsTable");
            _doctorTable = configuration.GetVariable("DoctorSettingsTable");
        }

        public async Task<bool> CheckIfUserExist(string login)
        {
            var table = await _tableStorage.GetTableReference(_userTable);
            var loginFilter = TableQuery.GenerateFilterCondition("UserName", QueryComparisons.Equal, login);
            var query = new TableQuery<UserEntity>().Where(loginFilter);
            TableContinuationToken tableContinuationToken = null;
            UserEntity result;
            do
            {
                var segmentedResult = await table.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
                tableContinuationToken = segmentedResult.ContinuationToken;
                result = segmentedResult.Results.FirstOrDefault();
            } while (tableContinuationToken != null);

            return result != null;
        }

        public async Task<bool> VerifyPassword(string login, string password)
        {
            var table = await _tableStorage.GetTableReference(_userTable);
            var loginFilter = TableQuery.GenerateFilterCondition("Login", QueryComparisons.Equal, login);
            var passwordFilter = TableQuery.GenerateFilterCondition("Password", QueryComparisons.Equal, password);
            var filter = TableQuery.CombineFilters(loginFilter, TableOperators.And, passwordFilter);
            var query = new TableQuery<UserEntity>().Where(filter);
            TableContinuationToken tableContinuationToken = null;
            UserEntity result;
            do
            {
                var segmentedResult = await table.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
                tableContinuationToken = segmentedResult.ContinuationToken;
                result = segmentedResult.Results.FirstOrDefault();
            } while (tableContinuationToken != null);

            return result != null;
        }

        public async Task InsertUserIntoTable(AzureUser user)
        {
            var table = await _tableStorage.GetTableReference(_userTable);
            var userEntity = new UserEntity()
            {
                PartitionKey = user.PartitionKey,
                RowKey = user.Id
            };

            var tableOperation = TableOperation.InsertOrMerge(userEntity);
            await table.ExecuteAsync(tableOperation);
        }

        public async Task<UserEntity> GetUserFromTable(string userName)
        {
            var cloudTable = await _tableStorage.GetTableReference(_userTable);
            var query = new TableQuery<UserEntity>()
                .Where(TableQuery.GenerateFilterCondition("UserName", QueryComparisons.Equal, userName.ToUpper()));
            var tableContinuationToken = new TableContinuationToken();
            var result = cloudTable.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
            var userEntity = result.Result.FirstOrDefault();
            return userEntity;
        }

        public async Task<PersonalDataSettings> GetUserFromId(string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_userSettingsTable);
            var query = new TableQuery<UserSettingsEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id));
            var tableContinuationToken = new TableContinuationToken();
            var result = cloudTable.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
            var userEntity = result.Result.FirstOrDefault();
            return userEntity.Model;
        }

        public async Task AddOrUpdateUserAsync(PersonalDataSettings user, string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_userSettingsTable);
            var userEntity = new UserSettingsEntity()
            {
                PartitionKey = id,
                RowKey = "",
                Model = user
            };
            var op = TableOperation.InsertOrReplace(userEntity);
            await cloudTable.ExecuteAsync(op);
        }

        public async Task AddOrUpdateDoctorAsync(DoctorSettings user, string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_doctorTable);
            var userEntity = new DoctorSettingsEntity()
            {
                PartitionKey = id,
                RowKey = user.Name + '.' + user.Lastname,
                Model = user
            };
            var op = TableOperation.InsertOrReplace(userEntity);
            await cloudTable.ExecuteAsync(op);
        }

        public async Task<DoctorSettings> GetDoctorFromId(string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_doctorTable);
            var query = new TableQuery<DoctorSettingsEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id));
            var tableContinuationToken = new TableContinuationToken();
            var result = cloudTable.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
            var userEntity = result.Result.FirstOrDefault();
            return userEntity.Model;
        }

        public async Task DeleteDoctorEntity(string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_doctorTable);
            var query = new TableQuery<DoctorSettingsEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id));
            var tableContinuationToken = new TableContinuationToken();
            var result = cloudTable.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
            var userEntity = result.Result.FirstOrDefault();
            var op = TableOperation.Delete(userEntity);
            await cloudTable.ExecuteAsync(op);
        }

        public async Task DeleteUserEntity(string id)
        {
            var cloudTable = await _tableStorage.GetTableReference(_userSettingsTable);
            var query = new TableQuery<UserSettingsEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id));
            var tableContinuationToken = new TableContinuationToken();
            var result = cloudTable.ExecuteQuerySegmentedAsync(query, tableContinuationToken);
            var userEntity = result.Result.FirstOrDefault();
            var op = TableOperation.Delete(userEntity);
            await cloudTable.ExecuteAsync(op);
        }

        public async Task<List<DoctorSettingsEntity>> GettAllDoctors()
        {
            var cloudTable = await _tableStorage.GetTableReference(_doctorTable);

            TableContinuationToken token = null;
            var entities = new List<DoctorSettingsEntity>();
            do
            {
                var queryResult = await cloudTable.ExecuteQuerySegmentedAsync(new TableQuery<DoctorSettingsEntity>(), token);
                entities.AddRange(queryResult.Results);
                token = queryResult.ContinuationToken;
            } while (token != null);

            return entities;
        }

        public async Task<List<UserSettingsEntity>> GetAllUsers()
        {
            var cloudTable = await _tableStorage.GetTableReference(_userSettingsTable);

            TableContinuationToken token = null;
            var entities = new List<UserSettingsEntity>();
            do
            {
                var queryResult = await cloudTable.ExecuteQuerySegmentedAsync(new TableQuery<UserSettingsEntity>(), token);
                entities.AddRange(queryResult.Results);
                token = queryResult.ContinuationToken;
            } while (token != null);

            return entities;
        }
    }
}




