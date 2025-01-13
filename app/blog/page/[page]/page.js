import { BlogPosts } from '@/components/posts';
import { getBlogPosts, countedTags } from '@/app/utils/utils';
import Link from 'next/link';

export async function generateStaticParams() {
  let posts = getBlogPosts('blog/posts');
  const maxPage = Math.ceil(posts.length / 6);
  let pageObj = [];
  for (let i = 0; i <= maxPage; i++) {
    pageObj.push({ page: i.toString() });
  }
  return pageObj;
}

export default async function Blog({ params }) {
  let allPostsData = getBlogPosts('blog/posts');
  let allTags = countedTags(allPostsData);
  const pageParams = await params;

  return (
    <section>
      <h2>Blog Posts</h2>
      <section className='flex flex-col md:flex-row'>
        <small className='gap-1 flex flex-row flex-wrap	w-full h-20 mb-5 overflow-scroll md:h-full md:overflow-auto md:flex-none md:flex-col md:gap-0 md:w-48'>
          {allTags.map((tag) => (
            <div key={tag.tag} className='text-nowrap p-1 w-auto'>
              <Link href={`/blog/tags/${tag.tag}`}>
                #{tag.tag} ({tag.count})
              </Link>
            </div>
          ))}
        </small>
        <BlogPosts posts={allPostsData} page={pageParams.page} />
      </section>
    </section>
  );
}
