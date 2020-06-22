using Microsoft.Extensions.Configuration;

namespace MolesApi.Storage
{
    public interface IAppConfiguration:IConfiguration
    {
        string GetConnectionString(string name);

        string GetVariable(string name);

        string GetEnvironmentVariable(string name);

        IConfigurationSection GetSection(string key);
    }
}