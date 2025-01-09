import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/app/utils/utils';

export function BlogPosts({ posts, begin = 0, end = 6 }) {
  return (
    <div className='grid grid-cols-2 gap-4 px-4'>
      {posts
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .slice(begin, end)
        .map((post) => (
          <div key={post.slug} className='w-96 rounded-lg shadow-md bg-gray-800 text-white pb-4'>
            <Image
              src={`/images/blogimages/${post.metadata.banner}`}
              width={384}
              height={120}
              alt='banner'
              title={post.title}
              className='object-cover object-left-top rounded-t-lg pb-4 h-[120px]'
            />
            <Link href={`/blog/${post.slug}`} className='font-bold px-4 pb-2 text-white inline-block'>
              {post.metadata.title}
            </Link>
            <br />
            <small className='flex px-4 gap-2'>
              {post.metadata.tags.map((tag) => (
                <div key={tag} className='rounded-lg bg-gray-700 text-white px-2 py-1'>
                  <Link href={`/blog/tags/${tag}`}>#{tag}</Link>
                </div>
              ))}
            </small>
            <small className='px-4'>{formatDate(post.metadata.date)}</small>
          </div>
        ))}
    </div>
  );
}
