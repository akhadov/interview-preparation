using BlogPost.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BlogPost.Api.Data;

public class BlogsContext : DbContext
{
    public BlogsContext(DbContextOptions<BlogsContext> options)
        : base(options)
    {
    }

    public DbSet<BlogEntity> BlogsEntities { get; set; }
    public DbSet<PostEntity> PostsEntities { get; set; }
}
