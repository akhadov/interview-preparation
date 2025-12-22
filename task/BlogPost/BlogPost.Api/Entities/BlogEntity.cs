using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogPost.Api.Entities;

[Table("blogs")]
public class BlogEntity
{
    [Column("blog_id")]
    public int BlogId { get; set; }

    [Required]
    [Column("name")]
    [MaxLength(50), MinLength(10)]
    public string Name { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; }

    public List<PostEntity> Articles { get; set; } = new List<PostEntity>();
}
