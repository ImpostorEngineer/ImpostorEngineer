import { BlogPosts } from '@/components/posts';
import { getBlogPosts } from '@/app/utils/utils';

export default function Blog() {
  let allPostsData = getBlogPosts('blog/posts');

  return (
    <section>
      <h2>Blog Posts</h2>
      <BlogPosts posts={allPostsData} />
    </section>
  );
}
