import { getBlogPosts } from '@/app/utils/utils';
import Link from 'next/link';

export default function Tags() {
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
    <div>
      <h2>Tags</h2>
      <small className='flex px-4 gap-2 text-white'>
        {countedTags.map((tag) => (
          <div key={tag} className='rounded-lg bg-gray-700 text-white px-2 py-1'>
            <Link href={`/blog/tags/${tag.tag}`}>
              #{tag.tag} ({tag.count})
            </Link>
          </div>
        ))}
      </small>
    </div>
  );
}
