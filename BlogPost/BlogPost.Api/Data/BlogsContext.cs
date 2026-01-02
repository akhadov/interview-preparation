using BlogPost.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Data;

public class BlogsContext : DbContext
{
    public BlogsContext(DbContextOptions<BlogsContext> options)
        : base(options)
    {
    }

    public DbSet<BlogEntity> BlogsEntities { get; set; }
    public DbSet<PostEntity> PostsEntities { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<BlogEntity>(entity =>
        {
            entity.ToTable("blogs");

            entity.HasKey(b => b.BlogId);

            entity.Property(b => b.BlogId).HasColumnName("blog_id");

            entity.Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.Property(b => b.IsActive)
            .HasColumnName("is_active")
            .HasConversion(
                v => v ? "Blog is active" : "Blog is not active",
                v => v == "Blog is active");

            entity.HasMany(b => b.Articles)
            .WithOne()
            .HasForeignKey(p => p.ParentId)
            .IsRequired();
        });

        builder.Entity<PostEntity>(entity =>
        {
            entity.ToTable("articles");

            entity.HasKey(p => p.PostId);

            entity.Property(p => p.PostId).HasColumnName("post_id");

            entity.Property(p => p.ParentId)
                .IsRequired()
                .HasColumnName("blog_id");

            entity.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.Property(p => p.Content)
                .IsRequired()
                .HasMaxLength(1000)
                .HasColumnName("content");

            entity.Property(p => p.Created)
                .IsRequired()
                .HasColumnName("created");

            entity.Property(p => p.Updated)
                .HasColumnName("updated");
        });
    }

    public override int SaveChanges()
    {
        this.ExecuteValidation();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        this.ExecuteValidation();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ExecuteValidation()
    {
        var entities = this.ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified)
            .Select(e => e.Entity);

        foreach (var entity in entities)
        {
            var validationContext = new ValidationContext(entity);
            var validationResults = new List<ValidationResult>();

            if (!Validator.TryValidateObject(entity, validationContext, validationResults, validateAllProperties: true))
            {
                var errorMessages = string.Join("; ", validationResults.Select(r => r.ErrorMessage));
                throw new ValidationException($"Validation failed for entity {entity.GetType().Name}: {errorMessages}");
            }
        }
    }
}
