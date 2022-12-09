import { getSortedPostsData } from './posts';

export async function getPageNumbers(pages) {
  const perPage = 6;
  const allPostsData = getSortedPostsData();
  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / perPage, 0);
  const start = (pages - 1) * perPage;
  let end = start + perPage;
  if (end > totalPosts) {
    end = totalPosts;
  }
  return {
    currentPage: pages,
    perPage: perPage,
    totalCount: totalPosts,
    pageCount: totalPages,
    start: start,
    end: end,
  };
}
