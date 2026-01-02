namespace BlogPost.Api.DTOs;

public record BlogDto
{
    public int BlogId { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public List<PostDto> Articles { get; set; } = new();
}
