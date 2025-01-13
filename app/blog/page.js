import { BlogPosts } from '@/components/posts';
import { Tags } from '@/components/tags';
import { getBlogPosts, countedTags } from '@/app/utils/utils';

export default function Blog() {
  let allPostsData = getBlogPosts('blog/posts');
  let allTags = countedTags(allPostsData);

  return (
    <section>
      <h2>Blog Posts</h2>
      <section className='flex flex-col md:flex-row'>
        <Tags allTags={allTags} />
        <BlogPosts posts={allPostsData} page={1} slice={6} />
      </section>
    </section>
  );
}
