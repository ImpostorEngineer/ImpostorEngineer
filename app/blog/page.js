import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getBlogPosts } from '@/app/utils/utils';

export default function Blog() {
  let allPostsData = getBlogPosts('blog/posts');
  return (
    <div>
      <h2>Blog Posts</h2>
      <div className='grid grid-cols-2 gap-4'>
        {allPostsData.map((post) => (
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
                  #{tag}
                </div>
              ))}
            </small>
            <small className='px-4'>{formatDate(post.metadata.date)}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
