import { CustomMDX } from '../../utils/md.js';
import { formatDate, getBlogPosts } from '../../utils//utils.js';

const baseUrl = 'https://impostorengineer.vercel.app';

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
      <div className='flex justify-between items-center mt-2 mb-8 text-sm'>
        <p className='text-sm'>{formatDate(post.metadata.date)}</p>
      </div>
      <article className='post'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
