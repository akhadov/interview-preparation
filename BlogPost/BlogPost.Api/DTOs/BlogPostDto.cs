namespace BlogPost.Api.DTOs
{
    public record BlogPostDto
    {
        public int BlogId { get; init; }

        public string Name { get; init; }

        public bool IsActive { get; init; }

        public List<PostDto> Articles { get; init; } = new List<PostDto>();
    }
}
