import utilStyles from '../styles/utils.module.css';
import PostListing from './listposts';

const LatestPosts = ({ data }) => {
  return (
    <section className={`${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingMd}>Latest blog posts:</h2>
      <div className={utilStyles.posts}>
        <PostListing postData={data.slice(0, 2)} />
      </div>
    </section>
  );
};

export default LatestPosts;
