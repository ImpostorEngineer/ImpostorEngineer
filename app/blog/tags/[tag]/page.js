import { BlogPosts } from '@/components/posts';
import { getBlogPosts } from '@/app/utils/utils';

export default async function Tags({ params }) {
  const tagParams = await params;

  let allPostsData = getBlogPosts('blog/posts');
  const filteredPosts = allPostsData.filter((post) => post.metadata.tags.indexOf(tagParams.tag) !== -1);

  return (
    <div>
      <h2>Blog Posts with Tag: {tagParams.tag}</h2>
      <BlogPosts posts={filteredPosts} />
    </div>
  );
}
