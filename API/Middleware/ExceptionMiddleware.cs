using System.Net;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using API.Errors;
using System.Text.Json;

namespace API.Middleware
{
    /// <summary>
    /// Custom middleware to handle exceptions.
    /// I understand this that it is like angular's interceptor
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="next">This is a function that can process an HTTP request.
        /// If there's no exception we want this to move on to the next piece of middleware</param>
        /// <param name="logger"></param>
        /// <param name="env"></param>
        public ExceptionMiddleware(RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        /// <summary>
        /// As a request comes in to our API, and it goes through our middleware, 
        /// this method is going to replace the default's app.UseDeveloperExceptionPage()
        /// in Startup.cs's method Configure()
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // if there's no exception, then the request moves on to its next stage
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() ?
                    new ApiException((int)HttpStatusCode.InternalServerError,
                            ex.Message, ex.StackTrace.ToString())
                            : new ApiException((int)HttpStatusCode.InternalServerError);

                var options = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}