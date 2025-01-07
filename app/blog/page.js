import Link from 'next/link';
import { formatDate, getBlogPosts } from '@/app/utils/utils';

export default function Blog() {
  let allPostsData = getBlogPosts('blog/posts');
  return (
    <div>
      <h2>Blog Posts</h2>
      {allPostsData.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
          <br />
          <small>{formatDate(post.metadata.date)}</small>
        </div>
      ))}
    </div>
  );
}
