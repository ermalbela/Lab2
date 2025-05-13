using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using backend.Models;

[ApiController]
[Route("api/movies")]
public class MovieController : ControllerBase
{
    private readonly IMongoCollection<Movie> _movies;

    public MovieController(IConfiguration config)
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
        _movies = database.GetCollection<Movie>(config["MongoDbSettings:CollectionName"]);
    }

    [HttpGet("get_movies")]
    public ActionResult<List<Movie>> Get()
    {
        var movies = _movies.Find(_ => true).ToList();
        return Ok(movies);
    }

    [HttpGet("get_movie/{id}")]
    public ActionResult<Movie> Get(string id)
    {
        var movie = _movies.Find(m => m.Id == id).FirstOrDefault();

        if (movie == null)
        {
            return NotFound($"Movie with ID {id} not found.");
        }

        return Ok(movie);
    }
}