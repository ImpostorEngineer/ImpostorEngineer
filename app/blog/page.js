import { BlogPosts } from '@/components/posts';
import { getBlogPosts } from '@/app/utils/utils';
import Link from 'next/link';

export default function Blog() {
  let allPostsData = getBlogPosts('blog/posts');

  function countOccurrences(arr, item) {
    return arr.filter((currentItem) => currentItem === item).length;
  }

  let allTags = [];
  allPostsData.map((p) =>
    p.metadata.tags.map((t) => {
      allTags.push(t);
    })
  );
  const uniqueTags = [...new Set(allTags)];

  const countedTags = uniqueTags.map((tag) => {
    return { tag: tag, count: countOccurrences(allTags, tag) };
  });

  return (
    <section>
      <h2>Blog Posts</h2>
      <section className='flex flex-col md:flex-row'>
        <small className='gap-1 flex flex-row flex-wrap	w-full md:flex-none md:flex-col md:gap-0 md:w-40'>
          {countedTags.map((tag) => (
            <div
              key={tag.tag}
              className='rounded-lg bg-gray-600 text-nowrap text-white p-2 my-2 dark:text-black dark:bg-neutral-200 w-auto md:my-1 md:w-40'
            >
              <Link href={`/blog/tags/${tag.tag}`}>
                #{tag.tag} ({tag.count})
              </Link>
            </div>
          ))}
        </small>
        <BlogPosts posts={allPostsData} />
      </section>
    </section>
  );
}
