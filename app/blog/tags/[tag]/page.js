import { BlogPosts } from '@/components/posts';
import { getBlogPosts } from '@/app/utils/utils';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  let posts = getBlogPosts('blog/posts');

  let tagArr = [];
  posts.map((p) =>
    p.metadata.tags.map((t) => {
      tagArr.push(t);
    })
  );
  tagArr = [...new Set(tagArr)];
  return tagArr.map((t) => ({ tag: t }));
}

export default async function Tags({ params }) {
  const tagParams = await params;
  let allPostsData = getBlogPosts('blog/posts');
  const filteredPosts = allPostsData.filter((post) => post.metadata.tags.indexOf(tagParams.tag) !== -1);

  if (!filteredPosts) {
    notFound();
  }

  return (
    <div>
      <h2>Blog Posts with Tag: {tagParams.tag}</h2>
      <BlogPosts posts={filteredPosts} />
    </div>
  );
}
