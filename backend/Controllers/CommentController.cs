using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController : Controller
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentController(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
            _comments = database.GetCollection<Comment>(config["MongoDbSettings:CommentsCollectionName"]);
        }

        [HttpPost("add_comment")]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            try
            {
                await _comments.InsertOneAsync(comment);
                return Ok(new {message = "Comment Added Successfully!"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("get_comments/{movieId}")]
        public async Task<IActionResult> GetCommentsForMovie(string movieId)
        {
            try
            {
                var comments = await _comments.Find(c => c.MovieId == movieId).ToListAsync();
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
