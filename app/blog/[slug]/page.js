import Link from 'next/link';
import { CustomMDX } from '@/app/utils/md.js';
import { formatDate, getBlogPosts } from '@/app/utils/utils.js';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  let posts = getBlogPosts('blog/posts');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Blog({ params }) {
  const postParams = await params;
  let post = getBlogPosts('blog/posts').find((post) => post.slug === postParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h2>{post.metadata.title}</h2>
      <div className='flex justify-between items-center my-2 text-sm'>
        <p className='text-sm'>{formatDate(post.metadata.date)}</p>
      </div>
      <small className='flex gap-2'>
        {post.metadata.tags.map((tag) => (
          <div key={tag} className='rounded-lg bg-gray-700 text-white px-1 py-1 dark:text-black dark:bg-neutral-300'>
            <Link href={`/blog/tags/${tag}`}>#{tag}</Link>
          </div>
        ))}
      </small>
      <article className='post'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
