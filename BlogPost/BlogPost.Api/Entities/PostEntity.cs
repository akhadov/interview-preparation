using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Entities;

public class PostEntity
{
    public int PostId { get; set; }
    public int ParentId { get; set; }
    public BlogEntity Parent { get; set; }
    [Required]
    [StringLength(50, MinimumLength = 10)]
    public string Name { get; set; }
    [Required]
    [StringLength(1000)]
    public string Content { get; set; }
    [Required]
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
}