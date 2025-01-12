import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/app/utils/utils';

export function BlogPosts({ posts, begin = 0, end = 6 }) {
  const today = +new Date();
  return (
    <div className='grid grid-cols-1 gap-4 md:px-4 md:grid-cols-2'>
      {posts
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .filter((post) => {
          const timeZoneOffset = new Date(Date.parse(post.metadata.date)).getTimezoneOffset() * 60 * 1001;
          const postDate = Date.parse(post.metadata.date) + timeZoneOffset;
          return (post.metadata.draft !== true) & (today >= postDate);
        })
        .slice(begin, end)
        .map((post) => (
          <div
            key={post.slug}
            className='w-[340px] rounded-lg bg-gray-900 text-white pb-4 md:w-[370px] shadow-[3px_3px_10px_rgba(51,51,51,1) dark:shadow-[3px_3px_10px_rgba(0,0,0,.6)]'
          >
            <Link href={`/blog/${post.slug}`} className=''>
              <Image
                src={`/images/blogimages/${post.metadata.banner}`}
                width={370}
                height={120}
                alt='banner'
                title={post.title}
                className='object-cover object-left-top rounded-t-lg pb-4 h-[120px] hover:grayscale'
              />
              <div className='font-bold px-4 pb-2 text-white inline-block hover:text-[var(--hover)]'>
                {post.metadata.title}
              </div>
            </Link>
            <br />
            <small className='flex px-4 gap-2'>
              {post.metadata.tags.map((tag) => (
                <div
                  key={tag}
                  className='rounded-lg bg-gray-600 text-white px-1 py-1 dark:text-black dark:bg-neutral-200'
                >
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
