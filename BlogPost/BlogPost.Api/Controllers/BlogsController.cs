using BlogPost.Api.Data;
using BlogPost.Api.DTOs;
using BlogPost.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogPost.Api.Controllers;

[ApiController]
[Route("blogs")]
public class BlogsController(BlogsContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetBlogs()
    {
        List<BlogDto> blogs = await context.BlogsEntities
            .Include(a => a.Articles)
            .Select(b => new BlogDto
            {
                BlogId = b.BlogId,
                Name = b.Name,
                IsActive = b.IsActive,
                Articles = b.Articles.Select(a => new PostDto
                {
                    PostId = a.PostId,
                    ParentId = a.ParentId,
                    Name = a.Name,
                    Content = a.Content,
                    Created = a.Created
                }).ToList()
            })
            .ToListAsync();

        return Ok(blogs);
    }

    [HttpGet]
    public async Task<IActionResult> GetBlog(int blogId)
    {
        BlogDto? blog = await context.BlogsEntities
            .Where(b => b.BlogId == blogId)
            .Select(b => new BlogDto
            {
                BlogId = b.BlogId,
                Name = b.Name,
                IsActive = b.IsActive
            })
            .FirstOrDefaultAsync();
        if (blog is null)
        {
            return NotFound();
        }
        return Ok(blog);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBlog([FromBody] BlogDto blogDto)
    {
        var blog = new BlogEntity
        {
            Name = blogDto.Name,
            IsActive = blogDto.IsActive
        };

        context.BlogsEntities.Add(blog);

        await context.SaveChangesAsync();

        return Ok(blog.BlogId);
    }

    [HttpDelete("{blogId}")]
    public async Task<IActionResult> DeleteBlog(int blogId)
    {
        var blog = await context.BlogsEntities.FindAsync(blogId);

        if (blog is null)
        {
            return NotFound();
        }

        context.BlogsEntities.Remove(blog);

        await context.SaveChangesAsync();

        return NoContent();
    }
}
