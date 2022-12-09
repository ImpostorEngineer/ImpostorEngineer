import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import PostDate from './formattedDate';
import Image from 'next/image';

const PostListing = ({ postData }) => {
  return (
    <>
      {postData.map(({ id, date, title, tags, draft, banner }) => (
        <div className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <Image
              className={utilStyles.banner}
              src={`/images/blogimages/${banner}`}
              alt='banner'
              height={150}
              width={380}
            />{' '}
            <div className={utilStyles.listItemText}>{title}</div>
          </Link>
          <div className={utilStyles.listItemText}>
            {tags.map((item, key) => (
              <small className={utilStyles.tagsWrapper} key={key}>
                <Link href={`/posts/tags/${item}`}>
                  <span className={`${utilStyles.tags} ${utilStyles.lightText}`}>{`#${item}`}</span>
                </Link>
              </small>
            ))}
            <br />
            <small className={utilStyles.lightText}>
              <PostDate dateString={date} />
            </small>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostListing;
