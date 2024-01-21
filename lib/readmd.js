import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeImgSize from 'rehype-img-size';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';

export async function readMD(dir, filename) {
  const postsDirectory = path.join(process.cwd(), dir);
  const fullPath = path.join(postsDirectory, `${filename}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(parse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeImgSize, { dir: 'public' })
    .data('settings', { fragment: true })
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
  };
}
