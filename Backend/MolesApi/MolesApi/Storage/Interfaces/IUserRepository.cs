using MolesApi.Models;
using MolesApi.Storage.Entities;
using MolesApi.Storage.StorageModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MolesApi.Storage
{
    public interface IUserRepository
    {
        Task InsertUserIntoTable(AzureUser user);
        Task<bool> CheckIfUserExist(string login);
        Task<bool> VerifyPassword(string login, string password);
        Task<UserEntity> GetUserFromTable(string userName);
        Task AddOrUpdateUserAsync(PersonalDataSettings user, string id);
        Task<PersonalDataSettings> GetUserFromId(string id);
        Task AddOrUpdateDoctorAsync(DoctorSettings user, string id);
        Task<DoctorSettings> GetDoctorFromId(string id);
        Task DeleteDoctorEntity(string id);
        Task DeleteUserEntity(string id);
        Task<List<DoctorSettingsEntity>> GettAllDoctors();
        Task<List<UserSettingsEntity>> GetAllUsers();

    }
}
