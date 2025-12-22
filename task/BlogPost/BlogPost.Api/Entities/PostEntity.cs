using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogPost.Api.Entities;

[Table("articles")]
public class PostEntity
{
    [Required]
    [Column("post_id")]
    public int PostId { get; set; }

    [Required]
    [Column("blog_id")]
    public int ParentId { get; set; }

    public BlogEntity Parent { get; set; }

    [Required]
    [Column("name")]
    [MaxLength(50), MinLength(10)]
    public string Name { get; set; }

    [Required]
    [Column("content")]
    [MaxLength(1000)]
    public string Content { get; set; }

    [Required]
    [Column("created")]
    public DateTime Created { get; set; }

    [Column("updated")]
    public DateTime? Updated { get; set; }
}