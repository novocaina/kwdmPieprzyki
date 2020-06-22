using System;

namespace MolesApi.Storage
{
    public class ResultModel
    {
        public string Id { get; internal set; }
        public string StatusCode { get; internal set; }
        public Exception Exception { get; internal set; }
    }
}