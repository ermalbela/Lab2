using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace backend.Models
{
    public class Movie 
    { 

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("plot")]
        public string Plot { get; set; } = null!;

        [BsonElement("genres")]
        public List<string> Genres { get; set; } = new();

        [BsonElement("actors")]
        public List<string> Actors { get; set; } = new();

        [BsonElement("poster")]
        public string Poster { get; set; } = null!;

        [BsonElement("languages")]
        public List<string> Languages { get; set; } = new();

        [BsonElement("released")]
        public DateTime Released { get; set; }

        [BsonElement("directors")]
        public List<string> Directors { get; set; } = new();
    }
}
