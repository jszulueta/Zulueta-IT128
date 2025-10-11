using Microsoft.AspNetCore.Mvc;
using BlogAPI.Models;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ILogger<PostController> _logger;

        public PostController(ILogger<PostController> logger)
        {
            _logger = logger;
        }

        private static List<Post> _posts = new List<Post>()
        {
            new Post
            {
                Id = 1,
                Title = "Welcome to My Blog",
                Body = "This is my first blog post. I'm excited to share my thoughts with you! This blog will cover various topics about web development, programming, and technology.",
                DateCreated = DateTime.Now.AddDays(-5),
                UserName = "Jahriiven",
                FirstName = "John",
                LastName = "Doe"
            },
            new Post
            {
                Id = 2,
                Title = "Learning Angular and .NET",
                Body = "Today I learned how to connect an Angular frontend with a .NET backend. It's amazing how they work together! The integration between these two powerful frameworks opens up endless possibilities for building modern web applications.",
                DateCreated = DateTime.Now.AddDays(-3),
                UserName = "Jahnella_Zuk",
                FirstName = "Jahnella",
                LastName = "Zulueta"
            },
            new Post
            {
                Id = 3,
                Title = "Building RESTful APIs",
                Body = "RESTful APIs are the backbone of modern web applications. Here's what I've learned about creating them with .NET Core. Understanding HTTP methods, status codes, and proper API design patterns is crucial for any web developer.",
                DateCreated = DateTime.Now.AddDays(-1),
                UserName = "Maria_Rosario",
                FirstName = "Maria",
                LastName = "Rosario"
            }
        };

        // GET: api/post
        [HttpGet]
        public IEnumerable<Post> Get()
        {
            _logger.LogInformation("Getting all posts");
            return _posts.OrderByDescending(p => p.DateCreated);
        }

        // GET: api/post/1
        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(int id)
        {
            _logger.LogInformation($"Getting post with id: {id}");
            var post = _posts.FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                _logger.LogWarning($"Post with id {id} not found");
                return NotFound();
            }

            return post;
        }

        // POST: api/post
        [HttpPost]
        public IActionResult AddPost([FromBody] Post newPost)
        {
            _logger.LogInformation("Adding new post");
            newPost.Id = _posts.Any() ? _posts.Max(p => p.Id) + 1 : 1;
            newPost.DateCreated = DateTime.Now;
            _posts.Add(newPost);

            return CreatedAtAction(nameof(GetPost), new { id = newPost.Id }, newPost);
        }

        // PUT: api/post/1
        [HttpPut("{id}")]
        public IActionResult UpdatePost(int id, [FromBody] Post post)
        {
            _logger.LogInformation($"Updating post with id: {id}");
            var existingPost = _posts.FirstOrDefault(p => p.Id == id);

            if (existingPost == null)
            {
                _logger.LogWarning($"Post with id {id} not found for update");
                return NotFound();
            }

            existingPost.Title = post.Title;
            existingPost.Body = post.Body;
            existingPost.UserName = post.UserName;
            existingPost.FirstName = post.FirstName;
            existingPost.LastName = post.LastName;

            return NoContent();
        }

        // DELETE: api/post/1
        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            _logger.LogInformation($"Deleting post with id: {id}");
            var postToRemove = _posts.FirstOrDefault(p => p.Id == id);

            if (postToRemove == null)
            {
                _logger.LogWarning($"Post with id {id} not found for deletion");
                return NotFound();
            }

            _posts.Remove(postToRemove);
            return NoContent();
        }
    }
}