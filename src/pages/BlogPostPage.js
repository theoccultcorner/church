// BlogPostPage component for displaying the full content of a blog post
const BlogPostPage = ({ blogPosts, match }) => {
    const postId = parseInt(match.params.id);
    const post = blogPosts.find(post => post.id === postId);
  
    if (!post) {
      return <Typography variant="h3">Post not found</Typography>;
    }
  
    return (
      <Container maxWidth="md">
        <BlogPost title={post.title} content={post.content} />
      </Container>
    );
  };
  
  export default BlogPostPage;
  