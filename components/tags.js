import Link from 'next/link';

export function Tags({ allTags }) {
  return (
    <small className='gap-1 flex flex-row flex-wrap	w-full h-20 mb-5 overflow-scroll md:h-full md:overflow-auto md:flex-none md:flex-col md:gap-0 md:w-48'>
      {allTags.map((tag) => (
        <div key={tag.tag} className='text-nowrap p-1 w-auto'>
          <Link href={`/blog/tags/${tag.tag}`}>
            #{tag.tag} ({tag.count})
          </Link>
        </div>
      ))}
    </small>
  );
}
