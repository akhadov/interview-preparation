using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Entities;

public class BlogEntity
{
    public int BlogId { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 10)]
    public string Name { get; set; }
    public bool IsActive { get; set; }

    public List<PostEntity> Articles { get; set; } = new List<PostEntity>();
}
