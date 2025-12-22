using BlogPost.Api.Data;
using BlogPost.Api.DTOs;
using BlogPost.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace BlogPost.Api.Controllers;

[ApiController]
[Route("posts")]
public class PostsController(BlogsContext context) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] PostDto postEntity)
    {

        var post = new PostEntity
        {
            PostId = postEntity.PostId,
            ParentId = postEntity.ParentId,
            Name = postEntity.Name,
            Content = postEntity.Content,
            Created = DateTime.UtcNow
        };

        context.PostsEntities.Add(post);

        await context.SaveChangesAsync();

        return Ok(postEntity.PostId);
    }
}
