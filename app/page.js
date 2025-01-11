import Image from 'next/image';
import { BlogPosts } from '@/components/posts';
import { getBlogPosts } from '@/app/utils/utils.js';

export default function Home() {
  let allPostsData = getBlogPosts('blog/posts');
  return (
    <div>
      <div className='flex justify-center'>
        <Image
          src='/images/ImpostorEngineer.png'
          priority
          width={178}
          height={178}
          alt='Impostor Engineer'
          className='align-center rounded-full shadow-md px-5 py-1 bg-neutral-300'
        />
      </div>
      <h2>Impostor Engineer, Ph.D.</h2>
      <section>
        <p className='py-1'>
          Hello, I am <strong>Impostor Engineer</strong>.
        </p>
        <p className='py-1'>I am not an engineer, I just pretend sometimes.</p>
        <p className='py-1'>On this page I will share some notes, code, and my projects.</p>
      </section>
      <section className='py-4'>
        <h2>Latest Blog Posts:</h2>
        <BlogPosts posts={allPostsData} end={2} />
      </section>
    </div>
  );
}
