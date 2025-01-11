import { getBlogPosts } from '@/app/utils/utils';
import Link from 'next/link';

export default function Tags() {
  let allPostsData = getBlogPosts('blog/posts');

  let tagArr = [];
  allPostsData.map((p) =>
    p.metadata.tags.map((t) => {
      tagArr.push(t);
    })
  );
  tagArr = [...new Set(tagArr)];
  tagArr.map((t) => {
    return {
      params: {
        tag: t,
      },
    };
  });

  return (
    <div>
      <h2>All The Tags</h2>
      <small className='flex px-4 gap-2 text-white'>
        {tagArr.map((t) => (
          <div key={t} className='rounded-lg bg-gray-700 text-white px-2 py-1'>
            <Link href={`/blog/tags/${t}`}>#{t}</Link>
          </div>
        ))}
      </small>
    </div>
  );
}
