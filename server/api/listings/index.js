import { postsMock } from "~/mocks/listings";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const totalItems = 240;
  const totalPages = 10;

  const pageSize = parseInt(query.pageSize || "10", 10);
  const pageNum = parseInt(query.pageNum || "1", 10);

  if (pageSize < 1 || pageNum < 1) {
    return {
      message:
        "Invalid parameters. pageSize and pageNum must be greater than or equal to 1.",
      result: [],
    };
  }

  if (pageNum > totalPages) {
    return {
      message: "No more posts available.",
      result: [],
    };
  }

  return {
    message: "Posts listed",
    currentPage: pageNum,
    pageSize: pageSize,
    totalPages: totalPages,
    totalItems: totalItems,
    result: postsMock,
  };
});
