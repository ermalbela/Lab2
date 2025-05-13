using backend.Data;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class MovieService
{
    private readonly IMongoCollection<Movie> _movies;

    public MovieService(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
        _movies = database.GetCollection<Movie>(configuration["MongoDbSettings:CollectionName"]);
    }

    public List<Movie> GetAll() => _movies.Find(_ => true).ToList();
}