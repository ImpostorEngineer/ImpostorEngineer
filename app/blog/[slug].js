import { CustomMDX } from '@app/utils/md.js';
import { formatDate, getBlogPosts } from '@app/blog/utils';

export async function generateStaticParams() {
  let posts = getBlogPosts('blog/posts');

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
