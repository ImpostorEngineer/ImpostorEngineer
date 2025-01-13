import { Tags } from '@/components/tags';
import { getBlogPosts, countedTags } from '@/app/utils/utils';

export default function TagsPage() {
  let allPostsData = getBlogPosts('blog/posts');
  let allTags = countedTags(allPostsData);

  return (
    <div>
      <h2>Tags</h2>
      <div className=''>
        <Tags allTags={allTags} />
      </div>
    </div>
  );
}
