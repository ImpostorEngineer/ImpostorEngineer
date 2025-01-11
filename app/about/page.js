import { getBlogPosts } from '@/app/utils/utils.js';
import { CustomMDX } from '@/app/utils/md.js';

export default function Page() {
  const mdContent = getBlogPosts('/about/content/');
  return (
    <section>
      <CustomMDX source={mdContent[0].content} />
    </section>
  );
}
