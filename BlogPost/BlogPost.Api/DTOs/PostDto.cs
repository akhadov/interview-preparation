namespace BlogPost.Api.DTOs;

public record PostDto
{
    public int PostId { get; set; }
    public int ParentId { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }

}
